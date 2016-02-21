#!/usr/bin/env python3

import sys, imaplib, email,\
    email.header, datetime, uuid, os, bleach, time

from pymongo import MongoClient

# MongoDB connection
client = MongoClient('localhost', 27017)
db = client.mail
inbox = db.inbox

last_email = None

EMAIL_ACCOUNT = "charliecmartell@gmail.com"
EMAIL_FOLDER = "inbox"

def make_email_pretty(email):
    # Strip the sender address off
    #email['sender'] = email['sender'].
    pass

def store_email(email):
    """ Puts the email into the mongodb db if its not already there """
    cursor = inbox.find({'message-id': email['message-id']})
    index = 0
    for values in cursor:
        index = index + 1
        break
    if index == 0:
        entry_id = inbox.insert(email)
        print(entry_id)

def parse_email(msg):
    """ Parses emails into dictionarys """
    email_to_store = {
            "id"         : uuid.uuid4().int & (1<<32)-1,
            "sender"     : "Unspecified",
            "subject"    : "Unspecified",
            "date"       : "Unspecified",
            "body"       : "Unspecified",
            "message-id" : "Unspecified",
            }
    for part in msg.walk():
        if part.get_content_type() == "multipart/alternative":
            for sub_part in part:
                if sub_part.lower() in email_to_store.keys():
                    email_to_store[sub_part.lower()] = part[sub_part]
        # text/plain is only other option
        if(part.get_content_type() == "text/plain"):
            # this is now the body
            #email_to_store['body'] = bleach.clean(
            #        str(part.get_payload(decode=True))[3:])
            email_to_store['body'] = str(part.get_payload(decode=True))[3:]
    #print(json.dumps(
    #        email_to_store,
    #        sort_keys=True, indent=4, ensure_ascii=False))
    if "Unspecified" not in email_to_store.values():
        email_to_store = make_email_pretty(email_to_store)
        store_email(email_to_store)

def process_mailbox(M):
    global last_email
    rv, data = M.search(None, "ALL")
    if rv != 'OK':
        print("No messages found!")
        return

    for index, num in enumerate(data[0].split()):
        # This is just so we dont put all the emails in db
        #if index >= 10: return
        rv, data = M.fetch(num, '(RFC822)')
        if rv != 'OK':
            print("ERROR getting message", num)
            return
        msg = email.message_from_bytes(data[0][1])
        if msg == last_email:
            return
        last_email = msg
        parse_email(msg)

def pull_from_imap():
    M = imaplib.IMAP4_SSL('imap.gmail.com')

    try:
        # NOTE: requires the environment variables.
        rv, data = M.login(os.environ.get('GMAIL'), os.environ.get('GMAIL_PW'))
    except imaplib.IMAP4.error:
        print("LOGIN FAILED!!! ")
        sys.exit(1)


    while(True):
        rv, mailboxes = M.list()
        if rv != 'OK':
            print("Cannot get mailboxes")

        rv, data = M.select(EMAIL_FOLDER)
        if rv == 'OK':
            process_mailbox(M)
        else:
            print("ERROR: Unable to open mailbox ", rv)
            time.sleep(1)

    M.close()
    M.logout()

if __name__ == "__main__":
    pull_from_imap()

