# LDAP Device Surveyor
The purpose of this program is to easily scan AD computers and see their status by their location.
* Python for API, scanning module, ldap and SQL interaction.
* Vue.JS SPA frontend, makes async API calls for data.
* Periodically scans all devices, pulls device information from LDAP if configured.
* Displays devices by subnet locations with an overview and collapsed tables.
* Device changes logged.
* Docker build optional
* HTTPS optional
* Users

Work in progress  

## Example  

https://ibb.co/H4Byyrq  
https://ibb.co/rcGnZj8  
https://ibb.co/WDQ3MRc  

If server is up:  

http://lds.ben-gardner.com  

user: admin  
password: testing1234  

## Install via Docker

```
git clone this repo

docker build backend/ -t lds-backend
docker run -p 5000:5000 -d --restart always --name lds-backend lds-backend

docker build /fronted -t lds-frontend
docker run -p 80:80 -p 443:443 -d --restart always -d lds-frontend

#Config:
#   Fill in config details with your own, default will work out of the box.

#For SSL:
#    Create SSL Certs as server.crt & server.key and place in frontend/ and backend/
#    Commented sections in frontend/nginx.conf and backend/Dockerfile show SSL directions.
#    For frontend:
#       Mount certs folder & restart the container whenever you renew the certs.
#       Insert in run command:
#           -v /path/to/local/certs_folder:/etc/nginx/certs

#To store databse edit config database location to an attached docker volume.
#    docker volume create lds-database
#    vim config.json -> "database": "database/database.sqlite"
#    Add to run command: --mount source=lds-database,target=/opt/ldap-device-surveyor/backend/database
```