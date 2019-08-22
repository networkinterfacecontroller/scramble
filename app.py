import os

from flask import Flask, request, jsonify
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import ChatGrant
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
app = Flask(__name__)

account_sid = os.environ['TWILIO_ACCOUNT_SID']
api_key = os.environ['TWILIO_API_KEY']
api_secret = os.environ['TWILIO_API_SECRET']
chat_service_sid = os.environ['TWILIO_CHAT_SERVICE_SID']

@app.route('/')
def index():
    pass

@app.route('/token', methods=['POST','GET'])
def token():
    if request.form.get('identity'):
        token = AccessToken(account_sid, api_key, api_secret, identity=request.form['identity'])
        chat_grant = ChatGrant(service_sid=chat_service_sid)
        token.add_grant(chat_grant)
        return jsonify({'token': token.to_jwt().decode('utf-8')})
    else:
        return 'tokens need an identity', 400
    pass

@app.route('/login')
def login():
    pass

app.run(debug=True, host='0.0.0.0', port=8888)