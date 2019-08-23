import Chat from 'twilio-chat';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './mystyles';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import Home from './components/Home';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      identity: '',
      keys: {
        secret: '',
        shared: ''
      }
    }
  }

  setIdentity = (identity) => {
    this.setState({
      ...this.state,
      identity
    })
  }

  setKeys = (secret, shared) => {
    this.setState({
      ...this.state,
      keys: {secret, shared}
    })
  }


  render() {
    return(
      <Router>
        <div className="hero is-primary is-fullheight is-flex">
          <Layout identity={this.state.identity}>
            <div className="hero-body" style={{height: '80vh'}}>
              <div className="container has-text-centered">
                {this.state.identity ?
                  <Home identity={this.state.identity} keys={this.state.keys}/> :
                  <Welcome setIdentity={this.setIdentity} setKeys={this.setKeys}/>
                }
              </div>
            </div>
          </Layout>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
