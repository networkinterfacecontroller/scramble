import React from 'react';
const axios = require('axios');

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChannel: '',
      addressField: '',
      messageField: '',
    }
  }

  componentDidMount() {
    this.props.client.on('channelInvited', channel => {
      channel.join().then(channel => this.channelJoined(channel));
    })
  }

  handleAddressChange = (event) => {
    this.setState({addressField: event.target.value})
  }

  handleMessageChange = (event) => {
    this.setState({messageField: event.target.value})
  }

  keyPress = (event) => {
    if (event.key === 'Enter') {
      this.sendMessage()
    }
  }

  sendMessage = async () => {
    await this.state.activeChannel.sendMessage(this.state.messageField)
    this.setState({messageField: ''})
  }

  connectToAddress = async () => {
    let channel = await this.props.client.createChannel({isPrivate: true});
    await channel.join();
    this.channelJoined(channel);
    try {
      await channel.invite(this.state.addressField);
    } catch {
      await channel.leave();
      this.setState({activeChannel: ''});
      this.cleanupChannel(channel.sid);
      this.setState({addressField: 'USER NOT FOUND'});
    }
  }

  channelJoined = (channel) => {
    this.setState({activeChannel: channel});
    channel.on('messageAdded', message => {
      console.log(message);
    })
  }

  cleanupChannel = (channelSid) => {
    axios.post('http://0.0.0.0:8888/cleanup_channel', {
      channel: channelSid
    })
  }

  render() {
    if (!this.state.activeChannel) {
      return (
        <div className="container" style={{height: '50vh', width: '50%'}}>
          <h1 className="subtitle">Enter another address to chat</h1>
          <input
            className="input"
            id="addressField"
            type="text"
            placeholder="address.."
            value={this.state.addressField}
            onChange={this.handleAddressChange}
          />
          <a style={{marginTop: '1em'}} className="button is-primary is-inverted" onClick={this.connectToAddress}>
            Go
          </a>
        </div>
      )
    }
    return (
      <div className="container">
        <div className="container" style={{backgroundColor: 'white', height: '50vh', width: '40%'}}>
          stuff
        </div>
        <input
          id="messageField"
          type="text"
          className="input"
          placeholder="say something.."
          value={this.state.messageField}
          style={{width: '40%'}}
          onChange={this.handleMessageChange}
          onKeyPress={this.keyPress}
        />
      </div>
    );
  }
}

export default Chat;
