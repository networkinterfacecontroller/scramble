import React from 'react';

function MessageHistory(props) {

  let sorted = props.messages.sort((a,b) => (a.timestamp > b.timestamp) ? 1 : -1);

  return (
    <div className="container" id="messageDiv" style={{overflowY: 'scroll'}}>
      {
        sorted.map(message => {
          let styled = (props.client.user.identity == message.sender) ?
          "has-text-right has-text-info has-text-weight-medium" :
          "has-text-left has-text-success has-text-weight-medium";
          return (
            <p key={message.timestamp} className={styled}>
              {message.body}
            </p>
          );
        })
      }
    </div>
  );
}

export default MessageHistory;
