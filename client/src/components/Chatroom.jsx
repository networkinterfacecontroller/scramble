import React from 'react';

import Message from '../helpers/message';
import MessageHistory from './MessageHistory'
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

  componentDidUpdate() {
    //scroll to bottom of window to follow chats
    var element = document.getElementById("messageDiv");
    element.scrollTop = element.scrollHeight;
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
    } catch (error) {
      //add error handling for failed send
      console.log(error);
    }
    this.setState({messageField: ''});
  }

  render() {
    return (
      <div className="container columns is-centered is-multiline">
        <div className="column is-one-third">
          <div className="box has-background-white" id="messageDiv" style={{overflowY: 'auto', height: '50vh'}}>
            <MessageHistory messages={this.state.messageHistory} client={this.props.client}/>
          </div>
          <input
            id="messageField"
            type="text"
            className="input box column"
            placeholder="say something.."
            value={this.state.messageField}
            onChange={this.handleMessageChange}
            onKeyPress={this.keyPress}
          />
        </div>
      </div>
    );
  }
}

export default Chatroom;
