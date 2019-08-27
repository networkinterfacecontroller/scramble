import React from 'react';

function Header(props) {
  return(
    <div className="hero-head">
      <nav className="level">
        <div className="level-left">
          <img src='img/eggcrack.png'/>
        </div>
        {Boolean(props.identity) &&
          <div className="level-item subtitle has-text-weight-bold">Your address is: <strong>{props.identity}</strong></div>
        }
        <div className="level-right s-header has-text-black">
          Scramble.
        </div>
      </nav>
    </div>
  )
}

export default Header;
