import sqlalchemy as db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# For class to create table
Base = declarative_base()

# Defines table for SqlAlchemy
class Table(Base):
    """Table for devices"""
    __tablename__ = 'table'
    id = db.Column(db.String(), primary_key=True)
    ip = db.Column(db.String())
    ping_code = db.Column(db.Integer())
    ping_time = db.Column(db.Float())
    time_stamp = db.Column(db.String())
    description = db.Column(db.String())
    location = db.Column(db.String())
    group = db.Column(db.String())
    tv = db.Column(db.String())
    lastup = db.Column(db.String())
    lastlogon = db.Column(db.String())
    os = db.Column(db.String())
    version = db.Column(db.String())

class Device:
    """Class for a device"""
    def __init__(self, id, ip, ping_code, ping_time, time_stamp, description, location, group, tv, lastup, lastlogon, os, version):
        self.id = id
        self.ip = ip
        self.ping_code = ping_code
        self.ping_time = ping_time
        self.time_stamp = time_stamp
        self.description = description
        self.location = location
        self.group = group
        self.tv = tv
        self.lastup = lastup
        self.lastlogon = lastlogon
        self.os = os
        self.version = version

class Location:
    """Class for a Location with Devices as child objects"""
    def __init__(self, location):
        self.location = location
        self.devices = []
    
    def add_device(self, device):
        self.devices.append(device)

    def get_device(self, code):
        device_list = []
        for device in self.devices:
            if int(device.ping_code) == int(code):
                device_list.append(device)

class DBObject:
    """Class to hold Location objects and Device objects based on return codes"""
    def __init__(self):
        self.locations = {}
        self.devices_0 = []
        self.devices_1 = []
        self.devices_2 = []

    def add_location(self, Location, location):
        self.locations[location] = Location



def connect_db(database):
    """Define Database to connect to. Will create if empty"""
    engine = db.create_engine(f'sqlite:///{database}', connect_args={'check_same_thread': False})
    connection = engine.connect()
    Session = sessionmaker(bind=engine)
    session = Session()
    metadata = db.MetaData()
    Base.metadata.create_all(engine)
    return engine, connection, session, metadata

def update_db(
    id,
    ip,
    ping_code,
    ping_time,
    time_stamp,
    description,
    location,
    group,
    tv,
    lastlogon,
    os,
    version,session):
    """Will Insert or Update Database with Device"""
    from modules.database import Table, Base
    data = [{'id': str(id),
             'ip': str(ip),
             'ping_code': int(ping_code),
             'ping_time': float(ping_time),
             'time_stamp': str(time_stamp),
             'description': str(description),
             'location': str(location),
             'group': str(group),
             'tv': str(tv),
             'lastlogon': str(lastlogon),
             'os': str(os),
             'version': str(version)}]
    if ping_code == 0:
        data[0]['lastup'] = str(time_stamp)
    existing_result = session.query(Table).filter_by(id=f'{id}').count()
    if existing_result > 0:
        session.bulk_update_mappings(Table, data)
        try:
            session.commit()
        except:
            session.rollback()
            return False
    else:
        session.bulk_insert_mappings(Table, data)
        try:
            session.commit()
        except:
            session.rollback()
            return False
    return True


def create_dbobject(data, locations, filter):
    """Creates Object to hold Locations and Devices"""
    dbObject = DBObject()

    for location in locations:
        location = str(location[0])
        dbObject.add_location(Location(location),location)

    for item in data:
        device = Device(
            id = item[0],
            ip = item[1],
            ping_code = item[2],
            ping_time = item[3],
            time_stamp = item[4],
            description = item[5],
            location = item[6],
            group = item[7],
            tv = item[8],
            lastup = item[9],
            lastlogon = item[10],
            os = item[11],
            version = item[12])
        dbObject.locations[str(item[6])].add_device(device)

        if item[2] == 0:
            dbObject.devices_0.append(device)
        elif (item[2] == 1) and (item[7] not in filter):
            dbObject.devices_1.append(device)
        elif (item[2] == 2) and (item[7] not in filter):
            dbObject.devices_2.append(device)

    return dbObject
