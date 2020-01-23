# LDAP Device Surveyor
The purpose of this program is to ping all computers under an OU and sort by location and sub-OU.
* Discovery pulls from LDAP and pings devices pulled.
* Stores results in a SQLite database which is pulled from by website.
* Uses async module for Discovery mode pings, throughput of ~20 devices per second.
* By default it runs discovery every 5 minutes.
* It cross-checks it's database with LDAP every 6hrs.
* You can filter the devices pulled from LDAP or displayed on overview and iframe.
* Custom attributes pulled from LDAP aswell.
* API to execute LDAP modify or move commands.
* Logs are password locked.

Work in progress.
Next item is to make attributes pulled modular.

## Install Walkthrough
git clone this repo  
sudo apt-get install python3.7 python3-pip   
python3.7 -m pip install -r requirements.txt  
useradd --user-group flask  
sudo chown flask:flask .* -R  
sudo chmod 4775 .* -R  

## Setup config file
mv package/config.json.example package/config.json

## Create SSL Certs as server.x509 & server.key
You can change web.py to not use SSL, just switch the commented out section.

## Initialize database
python3 discovery.py  

## Run website temporarily
python3 web.py

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
ExecStart=/usr/bin/python3.7 /opt/ldap_device_surveyor/package/web.py  
WorkingDirectory=/opt/ldap_device_surveyor/package
Restart=always  

[Install]  
WantedBy=multi-user.target
```

sudo systemctl daemon-reload --force  
sudo systemctl enable lds.service  
sudo systemctl start lds.service  


## API Examples
```
/api/v1/modify/computer=ServerVMMJ1699&description=ben.gardner.test&extensionAttribute2=Puyallup%20400&extensionAttribute3=1334566439&extensionAttribute5=0&hash=4ff1a20a41fa080ed4d2e28943c2e8d49ff9d201434960fc483e721dba81cab0
```

Fields are  
```
computer *required  
description  
extensionAttribute2  
extensionAttribute3  
extensionAttribute5 
hash *required 
```


Hash is sha256 of ("basequery" + "&date=%Y%m%d%H" + "&key=yoursecretkey121415151")
basequery example = computer=ServerVMMJ1699&description=ben.gardner.test

It will fail if wrong fields are submited or no computer or hash included, returns JSON with results. For hash issues look at logs for what is should be.

## Example Image

https://ibb.co/RpxmhPn
