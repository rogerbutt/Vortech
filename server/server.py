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
filters = db.filters

def make_new_recipe(emails, filtered):
    senders = []
    text = ""
    for email in emails["emails"]:
        if email['id'] in filtered['ids']:
            senders.append(email['sender'])
            text += email['body'].lower()

    BAD_CHARS = ".!?,\'\""
    words = [ word.strip(BAD_CHARS) for word in text.strip().split() if len(word) > 4 ]
    word_freq = {}

    for word in words :
      word_freq[word] = word_freq.get(word, 0) + 1
    tx = [ (v, k) for (k, v) in word_freq.items()]
    tx.sort(reverse=True)
    word_freq_sorted = [ (k, v) for (v, k) in tx ]

    keywords = []
    for xy in word_freq_sorted:
        x, y  = xy
        if y > 1:
            keywords.append(x)
    return keywords, senders

def handle_new_filter(name):

    def check_email_sender(email, filter_senders):
        return email['sender'] in filter_senders
    def check_email_body(email, filter_keywords):
        num_keywords = 0
        for keyword in filter_keywords:
            if keyword in email['body']:
                num_keywords += 1
        return num_keywords > 2

    filters = db.filters.find({'name':name}).limit(1)
    for new_filter in filters:
        filter_senders = new_filter['senders']
        filter_keywords = new_filter['keywords']
    for email in db.inbox.find():
        if check_email_sender(email, filter_senders) or check_email_body(email, filter_keywords):
            if email['filters'] is not None:
                print(type(email['filters']))
                complete_filter = email['filters']
                complete_filter.append(name)
            else:
                complete_filter = [name]
            db.inbox.update(
                {"id": email['id']},
                { "$set": { "filters": complete_filter}},
                upsert=False, multi=False)

@app.route('/api/v1/recipes/', methods=['GET','POST','OPTIONS'])
@crossdomain(origin='*',
        headers="Origin, X-Requested-With, Content-Type, Accept")
def get_post_recipes():
    """ Allows users to post and get the current recipes"""
    if request.method == 'GET':
        #if request.args.
        recipe = request.args.get('recipe')
        recipes = {"recipes": [] }
        for result in db.inbox.find():
            del result["_id"]
            if recipe is not None and recipe in result['filters']:
                recipes['recipes'].append(result)
            elif recipe is None:
                recipes['recipes'].append(result)
        return json.dumps(recipes, indent=4)
    if request.method == 'POST' or request.method == 'OPTIONS':
        req_json = request.get_json()
        print("Handling {}".format(req_json))
        emails = {"emails": [] }
        for result in db.inbox.find():
            del result["_id"]
            emails['emails'].append(result)
        keywords, senders = make_new_recipe(emails, req_json)
        new_filter = {
            'name': req_json['name'],
            "keywords": keywords,
            "senders": senders }
        db.filters.insert(new_filter)
        handle_new_filter(req_json['name'])
        ret_val = json.dumps(new_filter)
        print(ret_val)
        return ret_val

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
            email['filters'] = []
            db.inbox.insert(email)

def spawn_email_proc():
    cmd_str = "./get_emails.py"
    proc = Popen([cmd_str], shell=True,
             stdin=None, stdout=None, stderr=None, close_fds=True)
    return proc

if __name__ == '__main__':
    populate_mongodb()
    app.run()
