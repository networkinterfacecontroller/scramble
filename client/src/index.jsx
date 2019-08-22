import Chat from 'twilio-chat';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './mystyles';
import Layout from './components/Layout';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {identity: ''}
  }


  render() {
    return(
      <Router>
        <div className="hero is-primary is-fullheight">
          <Layout>
            {this.state.identity ?
              <Home/> :
              <Welcome/>
            }
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
