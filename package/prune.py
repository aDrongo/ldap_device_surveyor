import logging
import json
import sys
import os
import modules.database as database
import modules.ldap as ldap
import modules.pingdevice as pingdevice
from modules.assorted import getLocation, getGroup, compare, Config


def difference(data,ldap_results):
    """Converts inputs to Sets and returns any difference between the two"""
    table_devices = []
    ldap_devices = []
    for device in data:
        table_devices.append(device.id)
    for device in ldap_results:
        if compare(config.parameter['search_filter'], device.distinguishedName):
            ldap_devices.append(device.cn.value)
    diff = set(table_devices) - set(ldap_devices)
    return diff


def prune(data, session):
    """Removes devices from the database"""
    from modules.database import Table, Base
    i = 0
    for device in data:
        i = i + 1
        session.query(Table).filter_by(id=f'{device}').delete()
    try:
        session.commit()
        result = f'Deleted {i} devices from DB'
    except Exception as e:
        session.rollback()
        logging.error(e)
        result = f'Failed to delete devices from DB'
    session.close()
    return result


if __name__ == "__main__":
    # Start logging
    logging.basicConfig(filename=f'errors.log', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
    logging.debug('Running Prune')

    # Load Config
    try:
        config = Config()
    except Exception as e:
        logging.error(e)
        sys.exit(1)

    print('Running Prune')
    engine, connection, session, metadata = database.connect_db(config.parameter['database'])
    print('Connected to DB')
    data = session.query(database.Table).all()
    print('Retrieved Data from DB')
    ldap_results = ldap.search(config.parameter['server'], config.parameter['user_name'], config.parameter['user_pass'], config.parameter['search_base'], config.parameter['search_attributes'], "(objectClass=computer)")
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
