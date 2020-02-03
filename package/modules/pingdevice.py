class Ping():
    def __init__(self, name):
        """Pinged device"""
        self.name = name
        self.ip = "0"
        self.time = "0.0"
        self.subnet = '0.0.0'
        self.returncode = 1
        self.result = ''
    
    def ping(self):
        """Ping device, translate the result"""
        import subprocess
        import re
        #Ping device on IPv4
        ping = subprocess.run(['ping', f'{self.name}', '-c 1', '-w 2', '-4'], capture_output=True)
        #Ping device on IPv6 if not returning
        if int(ping.returncode) == 2:
            ping = subprocess.run(['ping', f'{self.name}', '-c 1', '-w 2', '-6'], capture_output=True)
        #Return standard output and error
        self.result = ping.stdout.decode()
        self.result = str(self.result) + str(ping.stderr.decode())
        self.returncode = int(ping.returncode)
        if self.returncode == 0:
                #Get IP
                try:
                    self.ip = (re.search(r'\d+\.\d+\.\d+\.\d+', str(self.result))).group(0)
                except:
                    self.ip = "0"
                #Get Subnet
                try:
                    self.subnet = (re.search(r'\d+\.\d+\.\d+', str(self.result))).group(0)
                except:
                    self.subnet = '0.0.0'
                #Get response time
                try:
                    self.time = str((re.search(r'time=\d+\.\d+', str(self.result))).group(0)).replace("time=","")
                except:
                    self.time = "0.0"


def ping(device):
    """Ping device, translate the result and return"""
    import subprocess
    import re
    #Ping device on IPv4
    ping = subprocess.run(['ping', f'{device}', '-c 1', '-w 2', '-4'], capture_output=True)
    #Ping device on IPv6 if not returning
    if int(ping.returncode) == 2:
        ping = subprocess.run(['ping', f'{device}', '-c 1', '-w 2', '-6'], capture_output=True)
    #Return standard output and error
    ping_result = ping.stdout.decode()
    ping_result = str(ping_result) + str(ping.stderr.decode())
    ping_returncode = int(ping.returncode)
    #Convert format
    if ping_returncode == 0:
        #Get IP
        try:
            ping_result_ip = (re.search(r'\d+\.\d+\.\d+\.\d+', str(ping_result))).group(0)
        except:
            ping_result_ip = 0
        #Get Subnet
        try:
            subnet_ip = (re.search(r'\d+\.\d+\.\d+', str(ping_result))).group(0)
        except:
            subnet_ip = '0.0.0.0'
        #Get response time
        try:
            ping_result_time = str((re.search(r'time=\d+\.\d+', str(ping_result))).group(0)).replace("time=","")
        except:
            ping_result_time = str("0.0")
    else:
        #Defaults
        subnet_ip = '0.0.0.0'
        ping_result_ip = 0
        ping_result_time = 0.0
    #Return results
    return ping_result_ip, ping_result_time, subnet_ip, ping_returncode
