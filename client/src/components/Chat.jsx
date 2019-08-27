import React from 'react';
const axios = require('axios');

import Chatroom from './Chatroom';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChannel: null,
      otherPerson: null,
      addressField: '',
      messageField: '',
    }
  }

  async componentDidMount() {
    //if we get invited to a channel, we should look up the other user to get publicKey
    //TODO: add accept/decline logic for invites
    this.props.client.on('channelInvited', channel => {
      channel.join().then(channel => {
        this.setState({activeChannel: channel});
        channel.getMembers().then(memlist => {
          memlist.forEach(member => {
            if (member.identity != this.props.client.user.identity) {
              member.getUser().then(user => {
                this.setState({otherPerson: user});
              })
            }
          })
        })
      });
    })
  }

  handleAddressChange = (event) => {
    this.setState({addressField: event.target.value})
  }

  connectToAddress = async () => {
    let channel = await this.props.client.createChannel({isPrivate: true});
    await channel.join();
    try {
      await channel.invite(this.state.addressField);
      let user = await this.props.client.getUser(this.state.addressField);
      //if we are the inviter, store the user we're inviting for public key access
      this.setState({otherPerson: user});
      this.setState({activeChannel: channel});
    } catch {
      //leave and delete failed channel
      await channel.leave();
      this.setState({activeChannel: null});
      this.cleanupChannel(channel.sid);
      this.setState({addressField: 'USER NOT FOUND'});
    }
  }

  cleanupChannel = (channelSid) => {
    axios.post('http://0.0.0.0:8888/cleanup_channel', {
      channel: channelSid
    })
  }

  render() {
    if (!this.state.activeChannel || !this.state.otherPerson) {
      return (
        <div className="container" style={{height: '50vh', width: '50%'}}>
          <h1 className="subtitle has-text-weight-bold">Enter another address to chat</h1>
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
      <Chatroom
        channel={this.state.activeChannel}
        client={this.props.client}
        otherUser={this.state.otherPerson}
        keys={this.props.keys}
      />
    );
  }
}

export default Chat;
