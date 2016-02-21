#!/usr/bin/env python3
import json
from flask import Flask, request
from cross_domain import crossdomain
from subprocess import Popen
from pymongo import MongoClient

# Import Flask
app = Flask(__name__)

# MongoDB connection
client = MongoClient('localhost', 27017)
db = client.mail
inbox = db.inbox

@app.route('/api/v1/mail/', methods=['GET'])
@crossdomain(origin='*')
def get_all_emails():
    """ Returns all emails in mongodb """
    if request.method == 'GET':
        emails = {"emails": [] }
        for result in db.inbox.find():
            del result["_id"]
            emails['emails'].append(result)
        return json.dumps(emails, indent=4, sort_keys=True)

def spawn_email_proc():
    cmd_str = "./get_emails.py"
    proc = Popen([cmd_str], shell=True,
             stdin=None, stdout=None, stderr=None, close_fds=True)
    return proc

if __name__ == '__main__':
#    proc = spawn_email_proc()
    app.run()
