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

@app.route('/api/v1/recipes/', methods=['GET','POST'])
@crossdomain(origin='*')
def get_post_recipes():
    """ Allows users to post and get the current recipes"""
    if request.method == 'GET':
        recipes = {"recipes": [] }
        for result in db.recipes.find():
            recipes['recipes'].append(result)
        return json.dumps(recipes, indent=4)
    if request.method == 'POST':
         request_json = request.json
         return request.json
         print(request_json)

@app.route('/api/v1/mail/', methods=['GET'])
@crossdomain(origin='*')
def get_all_emails():
    """ Returns all emails in mongodb """
    if request.method == 'GET':
        emails = {"emails": [] }
        for result in db.inbox.find():
            del result["_id"]
            emails['emails'].append(result)
        return json.dumps(emails, indent=4)

def populate_mongodb():
    with open('emails.json') as data_file:
        data = json.load(data_file)
    for email in data["emails"]:
        cursor = inbox.find({'id': email['id']})
        index = 0
        for values in cursor:
            index = index + 1
            break
        if index == 0:
            db.inbox.insert(email)

def spawn_email_proc():
    cmd_str = "./get_emails.py"
    proc = Popen([cmd_str], shell=True,
             stdin=None, stdout=None, stderr=None, close_fds=True)
    return proc

if __name__ == '__main__':
    populate_mongodb()
    app.run()
