from flask import Flask, render_template, Response, redirect, url_for, request
from functools import wraps
import sqlalchemy as db
from sqlalchemy.orm import sessionmaker
from collections import Counter
from jinja2 import Template
from apscheduler.schedulers.background import BackgroundScheduler
import hashlib
import os
import json
import operator
import sys
import time
import datetime
import math
import logging
import logging.handlers
import urllib
import modules.database as database
import modules.ldap as ldap
import modules.pingdevice as pingdevice
from modules.assorted import getLocation, getGroup, compare, loadConfig, convertRequest, header
from modules.database import Table, Base, Device, Location, DBObject, create_dbobject

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s', handlers=[logging.handlers.RotatingFileHandler("errors.log", maxBytes=1000000, backupCount=3)])
logging.info('Running web.py')

try:
    with open('config.json') as f:
        configFile = json.loads(f.read())
    try:
        config = {}
        config['server'] = str(configFile['server'])
        config['database'] = str(configFile['database'])
        config['user_name'] = str(configFile['user_name'])
        config['user_pass'] = str(configFile['user_pass'])
        config['user_name2'] = str(configFile['user_name2'])
        config['user_pass2'] = str(configFile['user_pass2'])
        config['flask_pass'] = str(configFile['flask_pass'])
        config['overview_filter'] = configFile['overview_filter']
        config['secretKey'] = str(configFile['secretKey'])
        config['search_base'] = str(configFile['search_base'])
        config['search_attributes'] = configFile['search_attributes']
        config['search_filter'] = configFile['search_filter']
        config['subnet_dict'] = configFile['subnet_dict']
    except Exception as e:
        loggin.error('Config file incorrect')
except Exception as e:
    logging.error('Config file not loaded')

def check_auth(username, password):
    """This function is called to check if a username /
    password combination is valid.
    """
    return username == 'admin' and password == config['flask_pass'] 

def authenticate():
    """Sends a 401 response that enables basic auth"""
    return Response(
    'Could not verify your access level for that URL.\n'
    'You have to login with proper credentials', 401,
    {'WWW-Authenticate': 'Basic realm="Login Required"'})

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated

app = Flask(__name__)


@app.route("/")
def home():
    #Connect to DB
    engine, connection, session, metadata = database.connect_db(config['database'])
    #Retrieve data
    data = connection.execute("SELECT * FROM 'table' ORDER BY 'group' DESC;")
    data = data.fetchall()
    #Sort by group
    data.sort(key=operator.itemgetter(7))
    #Get Locations list
    locations = connection.execute("SELECT DISTINCT location FROM 'table';")
    locations = locations.fetchall()
    locations.sort(key=operator.itemgetter(0))
    connection.close()

    dbObject = create_dbobject(data, locations, config['overview_filter'])

    return render_template("home.html", data=dbObject)


@app.route("/iframe")
def iframe():
    engine, connection, session, metadata = database.connect_db(config['database'])
    data = connection.execute("SELECT * FROM 'table' ORDER BY 'group' DESC;")
    data = data.fetchall()
    data.sort(key=operator.itemgetter(7))
    locations = connection.execute("SELECT DISTINCT location FROM 'table';")
    locations = locations.fetchall()
    locations.sort(key=operator.itemgetter(0))
    connection.close()

    dbObject = create_dbobject(data, locations, config['overview_filter'])

    return render_template("iframe.html", data=dbObject, overflow=40)


@app.route("/device/<device_id>")
def device(device_id):
    engine, connection, session, metadata = database.connect_db(config['database'])
    data = session.query(Table).filter_by(id=f'{device_id}').first()
    connection.close()
    return render_template("device.html", data=data)


@app.route("/discover_device/<device_id>")
def discover_device(device_id):
    import subprocess
    proc = subprocess.Popen(['python3.7', 'single.py', f'{device_id}'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
    proc.wait()
    return redirect(url_for('device', device_id=device_id))


@app.route("/discovery")
def discovery():
    import subprocess
    proc = subprocess.Popen(['python3.7', 'discovery.py'], stdout=subprocess.PIPE, universal_newlines=True)
    def inner():
        i = 0
        for stdout in iter(proc.stdout.readline, ""):
            if i == 0:
                i = i + 1
                yield header
            yield str(stdout) + "<br>\n"
    return Response(inner(), mimetype='text/html')


@app.route("/prune")
def prune():
    import subprocess
    proc = subprocess.Popen(['python3.7', 'prune.py'], stdout=subprocess.PIPE, universal_newlines=True)
    def inner():
        i = 0
        for stdout in iter(proc.stdout.readline, ""):
            if i == 0:
                i = i + 1
                yield header
            yield str(stdout) + "<br>\n"
    return Response(inner(), mimetype='text/html')


@app.route("/logs")
@requires_auth
def log():
    with open('errors.log') as file:
        data = file.read()
    data = data.split('\n')
    return render_template("logs.html", data=data)


@app.route('/api/v1/modify/<getData>', methods=['GET'])
def api_modify(getData):
    #Allowed fields
    Allowed = ['computer','hash','description','extensionAttribute2','extensionAttribute3','extensionAttribute5']
    #Split data
    requestData = convertRequest(getData)
    #Get List of Keys
    requestList = list(requestData)
    #Check if computer is specified
    if Allowed[0] not in requestData:
        result = {"result": 1, "description": "failure", "message": 'Error, no computer provided'}
    #Check if hash is specified
    if Allowed[1] not in requestData:
        result = {"result": 1, "description": "failure", "message": "Error, no hash provided"}
    #Check if all attributes are in Allowed list
    elif len(set(requestList).difference(Allowed)) > 0:
        result = {"result": 1, "description": "failure", "message": str(set(requestList).difference(Allowed)) + f"\nProvided:{requestList}\nAllowed:{Allowed}"}
    #Process request
    else:
        #Check Hash
        hashData = requestData['hash']
        requestData.pop('hash')
        index = getData.index("&hash=")
        baseQuery = getData[:index]
        date = str((datetime.datetime.now()).strftime("%Y%m%d%H"))
        hashQuery = baseQuery + f"&date={date}" + (f"&key={config['secretKey']}").rstrip()
        hashCalc = hashlib.sha256(hashQuery.encode()).hexdigest()
        if hashData != hashCalc:
            result = {"result": 1, "description": "failure", "message": f"Error, hash incorrect."}
            logging.debug(f'Hash incorrect, should be {hashCalc} for {hashQuery}')
        else:
            search_filter = requestData['computer']
            computer = search_filter
            search_filter = f'(cn={search_filter})'
            requestData.pop('computer')
            result = []
            for key in requestData:
                ldap_attribute = key
                data = requestData[key]
                resultData = ldap.update(config['server'], config['user_name'], config['user_pass'], config['search_base'], config['search_attributes'], search_filter, ldap_attribute, data)
                resultData['attribute'] = key
                resultData['data'] = data
                resultData['computer'] = computer
                resultData.pop('referrals', None)
                resultData.pop('message', None)
                resultData.pop('dn', None)
                resultData.pop('type', None)
                result.append(resultData)
    #Convert to JSON for return
    result = json.dumps(result)
    logging.info(result)
    return f'{result}'


@app.route('/api/v1/move/<getData>', methods=['GET'])
def api_move(getData):
    #Allowed fields
    AllowedKeys = ['computer','ou']
    AllowedValues = ['new','staging']
    OUs = {'new':'OU=New Computers,OU=Server Computers,DC=internal,DC=contoso,DC=com','staging':'OU=Staging,OU=New Computers,OU=Server Computers,DC=internal,DC=contoso,DC=com'}
    #Split data
    requestData = convertRequest(getData)
    #Get List of Keys
    requestList = list(requestData)
    #Check if computer is specified
    if AllowedKeys[0] not in requestData:
        result = {"result": 1, "description": "failure", "message": 'Error, no computer defined'}
    elif len(requestList) != 2:
        result = {"result": 1, "description": "failure", "message": 'Error, incorrect number of parameters defined'}
    #Check if all attributes are in Allowed list
    elif len(set(requestList).difference(AllowedKeys)) > 0:
        result = {"result": 1, "description": "failure", "message": f'{requestList}\n{AllowedKeys}'}
        #str(set(requestList).difference(AllowedKeys))
    #Check if OU Value is allowed
    elif requestData['ou'] not in AllowedValues:
        result = {"result": 1, "description": "failure", "message": "OUs must be 'new' or 'staging'"}
    #Process request
    else:
        result = []
        search_filter = requestData['computer']
        search_filter = f'(cn={search_filter})'
        requestData.pop('computer')
        for key in requestData:
            requestValue = requestData[key]
        new_ou = OUs[requestValue]
        resultData = ldap.move(config['server'], config['user_name'], config['user_pass'], config['search_base'], config['search_attributes'], search_filter, new_ou)
        resultData['computer'] = search_filter
        resultData['data'] = new_ou
        result.append(resultData)
    #Convert to JSON for return
    result = json.dumps(result)
    logging.info(result)
    return f'{result}'


@app.route("/cron_discovery")
def cron_discovery():
    logging.info('Running /cron_dicovery')
    import subprocess
    subprocess.Popen(['python3.7', 'discovery.py'])


@app.route("/cron_prune")
def cron_prune():
    logging.info('Running /cron_prune')
    import subprocess
    subprocess.Popen(['python3.7', 'prune.py'])


sched = BackgroundScheduler(daemon=True)
sched.add_job(cron_discovery,'interval',minutes=5)
sched.add_job(cron_prune,'interval',minutes=300)
sched.start()

#if you don't want to use https or you want debugging
#if __name__ == "__main__":
#    app.run(host="0.0.0.0", debug=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", ssl_context=('../server.x509', '../server.key'))
