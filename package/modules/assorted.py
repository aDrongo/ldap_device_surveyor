def getLocation(device,subnet_ip,subnets):
    if (len(device.extensionAttribute2.values) == 0) or (device.extensionAttribute2.value == 'unknown'):
        location = subnets.get(f"{subnet_ip}", 'unknown')
    else:
        location = device.extensionAttribute2.value
    return location

def getGroup(device):
    import re
    group = str((re.search(r'OU=\w+\s*\w*', str(device.distinguishedName))).group(0)).replace("OU=","")
    return group

def compare(filters, data):
    for filter in filters:
        if str(filter) not in str(data):
            pass
        else:
            return False
    return True

def rename(var):
    if var == 0:
        return 'good'
    else:
        return 'bad'

def convertRequest(data):
    dictData = {}
    data = (data.split('/'))[-1]
    data = data.split('&')
    #Process each request
    for request in data:
        request = request.split('=')
        dictData[f'{request[0]}'] = f'{request[1]}'
    return dictData

def loadConfig():
    import json
    try:
        with open('config.json') as f:
            configFile = json.loads(f.read())
        try:
            config = {}
            config['server'] = str(configFile['server'])
            config['database'] = str(configFile['database'])
            config['user_name'] = str(configFile['user_name'])
            config['user_pass'] = str(configFile['user_pass'])
            config['workers'] = str(configFile['workers'])
            config['search_base'] = str(configFile['search_base'])
            config['search_attributes'] = configFile['search_attributes']
            config['search_filter'] = configFile['search_filter']
            config['subnet_dict'] = configFile['subnet_dict']
        except Exception as e:
            print('Config file incorrect')
            raise e
    except Exception as e:
        print('Config file not loaded')
        raise e
    return config


header = """
<!DOCTYPE html>
<html>
 <head>
  <meta charset="utf-8" http-equiv="refresh" content="300" >
   <title>LDAP Device Surveyor</title>
    <style>
    ul { margin: 0; padding: 5px 5px 0 5px; float: left; }
    li { display: inline-block; padding: 2px 10px 2px 2px; color: #D9D8D6; vertical-align: middle; }
    html { 
        height: 100%;
        box-sizing: border-box;
    }
    body {
        background-color: #222222;
        color: white;
        font-family: monospace;
        min-height: 95%;
        position: relative;
        font-size: 10px;;
        margin: 0;
        padding: 50px 0 0 0;
      }
    a, a:link, a:visited, a:active {
        color: inherit;
        text-decoration: none;
      }
    a:hover{
        color: inherit;
        text-decoration: underline;
      }
    nav {
        position: fixed;
        margin: 0;
        font-size: 16px;
        background-color: #565557;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        display: inline-block;
        transition: all 0.2s;
        list-style-type: none;
        padding-left: 1%;
        top: 0;
    }
    </style>
 </head>
  <body>
    <nav>
      <ul>
        <li><img height="30px" src="https://cdn.contoso.com/img/3dc41c7.png"/></li>
        <li><a href="/">Overview</a></li>
      </ul>
    </nav>
    <div>
"""
