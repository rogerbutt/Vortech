#!/usr/bin/env python3
import json
from flask import Flask, request
from subprocess import Popen
from bson import json_util
from pymongo import MongoClient

# Import Flask
app = Flask(__name__)

# MongoDB connection
client = MongoClient('localhost', 27017)
db = client.mail
inbox = db.inbox

def to_json(data):
    """ Convert Mongo object(s) to JSON """
    return json.dumps(data, default=json_util.default)

@app.route('/api/v1/mail/', methods=['GET'])
def get_all_emails():
    """ Returns all emails in mongodb """
    if request.method == 'GET':

        emails = {"emails": [to_json(result) for result in db.inbox.find()] }
        return json.dumps(emails, indent=4, sort_keys=True)

def spawn_email_proc():
    cmd_str = "./get_emails.py"
    proc = Popen([cmd_str], shell=True,
             stdin=None, stdout=None, stderr=None, close_fds=True)
    return proc

if __name__ == '__main__':
#    proc = spawn_email_proc()
    app.run()
