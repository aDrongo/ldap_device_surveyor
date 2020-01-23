import logging
import json
import sys
import os
import modules.database as database
import modules.ldap as ldap
import modules.pingdevice as pingdevice
from modules.assorted import getLocation, getGroup, compare, loadConfig


def difference(data,ldap_results):
    table_devices = []
    ldap_devices = []
    for device in data:
        table_devices.append(device.id)
    for device in ldap_results:
        if compare(config['search_filter'], device.distinguishedName):
            ldap_devices.append(device.cn.value)
    diff = set(table_devices) - set(ldap_devices)
    return diff


def prune(data, session):
    from modules.database import Table, Base
    i = 0
    for device in data:
        i = i + 1
        logging.debug(f'deleting {device}')
        print(session.query(Table).filter_by(id=f'{device}'))
        session.query(Table).filter_by(id=f'{device}').delete()
        logging.debug(f'deleted from cache')
    try:
        session.commit()
        logging.debug(f'Deleted {i} devices from DB')
        result = f'Deleted {i} devices from DB'
    except Exception as e:
        session.rollback()
        logging.debug(f'Failed to delete devices from DB')
        logging.error(e)
        result = f'Failed to delete devices from DB'
    session.close()
    return result


logging.basicConfig(filename=f'errors.log', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logging.debug('Running Prune')

# Load Config
try:
    config = loadConfig()
except Exception as e:
    logging.error(e)
    sys.exit(1)

print('Running Prune')
engine, connection, session, metadata = database.connect_db(config['database'])
print('Connected to DB')
data = session.query(database.Table).all()
print('Retrieved Data from DB')
ldap_results = ldap.search(config['server'], config['user_name'], config['user_pass'], config['search_base'], config['search_attributes'], "(objectClass=computer)")
print('Retrieved Data from LDAP')
diff = difference(data,ldap_results)
print(f'Comparing Data')
if diff:
    print('Remove devices')
    print(diff)
    result = prune(diff, session)
    print(result)
else:
    print('No devices to remove')

logging.debug('Completed Prune')
