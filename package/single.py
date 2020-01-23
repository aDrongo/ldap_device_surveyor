import time
import logging
import json
import sys
import os
import modules.database as database
import modules.ldap as ldap
import modules.pingdevice as pingdevice
from modules.assorted import getLocation, getGroup, compare, loadConfig


if __name__ == "__main__":
    # Start time and logging
    current_Time = time.strftime("%Y-%m-%d %H:%M")
    logging.basicConfig(filename=f'errors.log', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
    logging.debug(f'Running single.py for {sys.argv[1]}')

    # Load Config
    try:
        config = loadConfig()
    except Exception as e:
        logging.error(e)
        sys.exit(1)

    # Scan LDAP for specified device
    filter = sys.argv[1]
    search_filter = f"(cn={filter})"
    ldap_results = ldap.search(config['server'], config['user_name'], config['user_pass'], config['search_base'], config['search_attributes'],search_filter)

    # Connect to DB
    engine, connection, session, metadata = database.connect_db(config['database'])

    for device in ldap_results:
        # Ping device & get details
        ping_result_ip, ping_result_time, subnet_ip, ping_result_returncode = pingdevice.ping(device.dnsHostname)
        location = getLocation(device,subnet_ip,config['subnet_dict'])
        group = getGroup(device)

        # Update Database
        result = database.update_db(
            device.cn,
            ping_result_ip,
            ping_result_returncode,
            ping_result_time,
            current_Time,
            device.description,
            location,
            group,
            device.extensionAttribute3,
            str(device.lastLogonTimestamp)[:16],
            device.operatingSystem,
            device.operatingSystemVersion,
            session)
        # If failed, let user know
        if not result:
            logging.debug(f"{device.cn} failed to update")
            print((f"{device.cn} failed to update"))
    
    logging.debug(f'Done for {sys.argv[1]}')
