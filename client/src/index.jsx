import Chat from 'twilio-chat';
import React from 'react';
import ReactDOM from 'react-dom';
import './mystyles.scss'

class App extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return(
      <section class="hero is-success is-fullheight">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Fullheight title
            </h1>
            <h2 class="subtitle">
              Fullheight subtitle
            </h2>
          </div>
        </div>
      </section>
    );
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
