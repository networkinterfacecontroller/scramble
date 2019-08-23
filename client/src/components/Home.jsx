import React from 'react';
import Twilio from 'twilio-chat';
const axios = require('axios');

import Chat from './Chat'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
      token: ''
    };
  }

  async componentDidMount() {
    let token = await this.getToken();
    if (token) { this.setState({token}) };
    let client = await this.createClient();
    if (client) { this.setState({client}) };
    this.setupChat();
  }

  getToken = () => {
    return axios.post('http://0.0.0.0:8888/token', {
      identity: this.props.identity
    }).then(function (response) {
      return response.data.token
    }).catch(function (error) {
      console.log(error)
      return false
    })
  }

  createClient = () => {
    //TODO add push notifications
    return Twilio.create(this.state.token)
  }

  setupChat = async () => {
    let me = await this.state.client.getUser(this.props.identity);
    me = await me.updateAttributes({'public_key': this.props.keys.shared});
  }

  render() {
    if (this.state.client) {
      return (
        <Chat client={this.state.client}/>
      );
    } else {
      return(
        <h1 className="title">Hi!</h1>
      );
    }
  }
}

export default Home;
