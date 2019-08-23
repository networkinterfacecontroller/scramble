import React from 'react';

import Setup from './Setup';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // bannerItems: [
      //   "Hello. Let's talk privately..",
      //   "Scramble keeps your conversations safe using the same technology as secured websites.",
      //   "We generate the keys on your computer, not our server.",
      //   "Privacy should be easy and accessible for everyone!",
      //   "Let's get started."
      // ]
      bannerItems: ["go"]
    };
  }

  handleClick = () => {
    this.setState({bannerItems: this.state.bannerItems.slice(1)});
  }

  render() {
    if (this.state.bannerItems.length) {
      return <p id="welcomeBanner" onClick={() => this.handleClick()}>{this.state.bannerItems[0]}</p>
    } else {
      return <Setup setIdentity={this.props.setIdentity} setKeys={this.props.setKeys}/>;
    }
  }
}

export default Welcome;
