# LDAP Device Surveyor
The purpose of this program is to easily scan AD computers and see their status by their location.
* Python/Flask for API
* Python for scanning module, ldap and SQL interaction
* Stores data in a SQLite database
* Pulls devices from AD with LDAP
* Uses async module to ping, throughput of ~60 devices per second.
* Scans every 5 minutes
* Custom attributes pulled from LDAP aswell.
* Vue.JS frontend

Work in progress

## Install Walkthrough
git clone this repo  
sudo apt-get install python3.7 python3-pip   
python3.7 -m pip install -r requirements.txt  
useradd --user-group flask  
sudo chown flask:flask .* -R  
sudo chmod 4775 .* -R  

## Setup config file
backend/config.json

## Create SSL Certs as server.x509 & server.key
You can change web.py to not use SSL, just switch the commented out section.

## Run website temporarily
python3 main.py

## Create Service for permenant Run
sudo vim /etc/systemd/system/lds.service  

```[Unit]  
Description=LDAP Device Surveyor  
Requires=network.target  
After=network.target  
After=syslog.target  

[Service]  
User=flask 
Group=flask  
ExecStart=/usr/bin/python3.7 /opt/ldap_device_surveyor/backend/main.py  
WorkingDirectory=/opt/ldap_device_surveyor/backend
Restart=always  

[Install]  
WantedBy=multi-user.target
sudo systemctl daemon-reload --force  
sudo systemctl enable lds.service  
sudo systemctl start lds.service 
```

