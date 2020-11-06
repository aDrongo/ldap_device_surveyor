# LDAP Device Surveyor
The purpose of this program is to easily scan AD computers and see their status by their location.
* Python for API, scanning module, ldap and SQL interaction.
* Vue.JS SPA frontend, makes ajax calls to API for data.
* Displays devices by subnet locations with an overview and collapsed tables.
* Scans LDAP and pulls devices from specified OUs.
* Intiate a Scan of all devices or just a single device by clicking on it.
* Set interval for periodic scanning, default 5 minutes.
* Add or Remove Devices manually as well.
* Add, Remove or Reset Users.
* Must be logged in to modify devices/users or view logs.
* Docker build optional
* HTTPS support

Work in progress

ToDo:
* Secure config.  
* Log history of device state changes.  
* Specific Device History?
* User Authorization for roles to edit devices and/or users?

## Install via Docker

```
git clone this repo

docker build backend/ -t lds-backend
docker run -p 5000:5000 -d --restart always -d lds-backend

docker build /fronted -t lds-frontend
docker run -p 80:80 -p 443:443 -d --restart always -d lds-frontend

#For SSL:
#    Create SSL Certs as server.crt & server.key and place in frontend/ and backend/
#        openssl req -newkey rsa:2048 -nodes -keyout server.key -x509 -days 365 -out server.crt
#    Commented sections in frontend/Dockerfile, frontend/nginx.conf and backend/Dockerfile show SSL directions.

#To store databse edit config database location to an attached docker volume.
#    docker volume create lds-database
#    vim config.json -> "database": "database/database.sqlite"
#    Add to run command: --mount source=lds-database,target=/opt/ldap-device-surveyor/backend/database
```

## Example

https://ibb.co/H4Byyrq  
https://ibb.co/rcGnZj8  
https://ibb.co/WDQ3MRc  

If server is up:  

lds.ben-gardner.com

admin
testing1234