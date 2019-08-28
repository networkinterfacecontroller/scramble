import React from 'react';

function Header(props) {
  return(
    <div className="hero-head">
      <nav className="level">
        <div className="level-left">
          <img src='img/eggcrack.png'/>
        </div>
        {Boolean(props.identity) &&
          <p className="subtitle has-text-weight-bold">Your address is: <strong>{props.identity}</strong></p>
        }
        <div className="level-right s-header has-text-black" style={{marginLeft: '-150px'}}>
          Scramble.
        </div>
      </nav>
    </div>
  )
}

export default Header;
