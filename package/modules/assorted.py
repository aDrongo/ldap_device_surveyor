def getLocation(device,subnet_ip,subnets):
    """With Users IP get Location from Subnet Dictionary, if no location default to device attribute location value unless none"""
    location = subnets.get(f"{subnet_ip}", 'unknown')
    if location == 'unknown':
        default = device.extensionAttribute2.value
        if not default:
            return location
        else:
            return default
    else:
        return location

def getGroup(device):
    """Use Regex to get first OU Group"""
    import re
    group = str((re.search(r'OU=\w+\s*\w*', str(device.distinguishedName))).group(0)).replace("OU=","")
    return group

def compare(filters, data):
    """Return True if data is in filters else return False """
    for filter in filters:
        if str(filter) not in str(data):
            pass
        else:
            return False
    return True

def rename(var):
    """Return 'good' if var == 0 else return 'bad'"""
    if var == 0:
        return 'good'
    else:
        return 'bad'

def convertRequest(data):
    """Convert GET query data into dictionary format"""
    dictData = {}
    data = (data.split('/'))[-1]
    data = data.split('&')
    for request in data:
        request = request.split('=')
        dictData[f'{request[0]}'] = f'{request[1]}'
    return dictData

class Config():
    """Loads the Config file"""
    def __init__(self):
        self.parameter = {}
        self.parameters = ['server','database','user_name','user_pass','user_name2','user_pass2','flask_pass','overview_filter','secretKey','workers','search_base','search_attributes','search_attributes','search_filter','subnet_dict']
        self._load()
        
    def _load(self):
        import json
        try:
            with open('config.json') as f:
                configFile = json.loads(f.read())
            for parameter in self.parameters:
                try:
                    self.parameter[parameter] = configFile[parameter]
                except Exception as e:
                    print(parameter + 'failed to load')
        except Exception as e:
            print('Config file not loaded')
            raise e


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
