#!/usr/bin/env python3

import sys, imaplib, email,\
    email.header, datetime, uuid, os, bleach

from pymongo import MongoClient

# MongoDB connection
client = MongoClient('localhost', 27017)
db = client.mail
inbox = db.inbox

EMAIL_ACCOUNT = "charliecmartell@gmail.com"
EMAIL_FOLDER = "inbox"

def store_email(email):
    """ Puts the email into the mongodb db """
    entry_id = inbox.insert(email)
    print(entry_id)

def parse_email(msg):
    """ Parses emails into dictionarys """
    email_to_store = {
            "id"      : uuid.uuid4().int & (1<<32)-1,
            "sender"  : "Unspecified",
            "subject" : "Unspecified",
            "date"    : "Unspecified",
            "body"    : "Unspecified",
            }
    for part in msg.walk():
        if part.get_content_type() == "multipart/alternative":
            for sub_part in part:
                if sub_part.lower() in email_to_store.keys():
                    email_to_store[sub_part.lower()] = part[sub_part]
        # text/plain is only other option
        if(part.get_content_type() == "text/plain"):
            # this is now the body
            email_to_store['body'] = bleach.clean(
                    str(part.get_payload(decode=True))[3:])
    #print(json.dumps(
    #        email_to_store,
    #        sort_keys=True, indent=4, ensure_ascii=False))
    if email_to_store['body'] != "Unspecified":
        store_email(email_to_store)

def process_mailbox(M):
    rv, data = M.search(None, "ALL")
    if rv != 'OK':
        print("No messages found!")
        return

    for index, num in enumerate(data[0].split()):
        # This is just so we dont put all the emails in db
        if index >= 500: return
        rv, data = M.fetch(num, '(RFC822)')
        if rv != 'OK':
            print("ERROR getting message", num)
            return
        msg = email.message_from_bytes(data[0][1])
        parse_email(msg)

M = imaplib.IMAP4_SSL('imap.gmail.com')

try:
    # NOTE: requires the environment variables.
    rv, data = M.login(os.environ.get('GMAIL'), os.environ.get('GMAIL_PW'))
except imaplib.IMAP4.error:
    print("LOGIN FAILED!!! ")
    sys.exit(1)

print(rv, data)

rv, mailboxes = M.list()
if rv != 'OK':
    print("Cannot get mailboxes")

rv, data = M.select(EMAIL_FOLDER)
if rv == 'OK':
    process_mailbox(M)
    M.close()
else:
    print("ERROR: Unable to open mailbox ", rv)

M.logout()

