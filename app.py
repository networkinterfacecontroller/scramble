import os

from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import ChatGrant
from twilio.rest import Client
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
app = Flask(__name__)
CORS(app)

account_sid = os.environ['TWILIO_ACCOUNT_SID']
api_key = os.environ['TWILIO_API_KEY']
api_secret = os.environ['TWILIO_API_SECRET']
chat_service_sid = os.environ['TWILIO_CHAT_SERVICE_SID']

@app.route('/')
def index():
    pass

@app.route('/token', methods=['POST'])
def token():
    if request.json.get('identity'):
        token = AccessToken(account_sid, api_key, api_secret, identity=request.json['identity'])
        chat_grant = ChatGrant(service_sid=chat_service_sid)
        token.add_grant(chat_grant)
        return jsonify({'token': token.to_jwt().decode('utf-8')})
    else:
        return 'tokens need an identity', 400

@app.route('/cleanup_channel', methods=['POST'])
def cleanup_channel():
    if request.json.get('channel'):
        client = Client(api_key, api_secret, account_sid)
        client.chat.services(chat_service_sid)\
                   .channels(request.json['channel'])\
                   .delete()
        return 'done', 200
    else:
        return 'needed a channel sid', 400

#TODO implement user login/save encrypted private key for retrieval
@app.route('/login')
def login():
    pass

app.run(debug=True, host='0.0.0.0', port=8888)
