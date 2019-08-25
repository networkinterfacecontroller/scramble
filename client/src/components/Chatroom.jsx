import React from 'react';

import Message from './Message';
import { encrypt, decrypt } from '../helpers/encryption'

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageField: '',
      messageHistory: []
    };
  }

  componentDidMount() {
    this.props.channel.on('messageAdded', message => {
      console.log(this.state.messageHistory);
      if (message.author != this.props.client.user.identity) {
        let msg = decrypt(
          message.body,
          this.props.otherUser.attributes.publicKey,
          this.props.keys.secret
        );
        this.setState({
          messageHistory: [
            ...this.state.messageHistory,
            new Message(
              msg,
              message.author,
              Date.now()
            )
          ]
        });
      }
    })
  }

  handleMessageChange = (event) => {
    this.setState({messageField: event.target.value});
  }

  keyPress = (event) => {
    if (event.key === 'Enter' && this.state.messageField.length > 0) {
      this.sendMessage();
    }
  }

  sendMessage = async () => {
    let msg = encrypt(
      this.state.messageField,
      this.props.otherUser.attributes.publicKey,
      this.props.keys.secret
    );
    console.log(msg);
    try {
      await this.props.channel.sendMessage(msg);
      //store unencrypted message in history
      this.setState({
        messageHistory: [
          ...this.state.messageHistory,
          new Message(
            this.state.messageField,
            this.props.client.user.identity,
            Date.now()
          )
        ]
      })
    } catch {
      //add error handling for failed send
      console.log('oops');
    }
    this.setState({messageField: ''});
  }

  render() {
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

export default Chatroom;
