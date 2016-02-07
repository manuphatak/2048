import React, { Component } from 'react';
import Link from '../Link';
import './Navigation.scss';

class Navigation extends Component {

  render() {
    return (
      <ul
        className="Navigation"
        role="menu"
      >
        <li className="Navigation-item">
          <a
            className="Navigation-link"
            href="/"
            onClick={Link.handleClick}
          >Home
          </a>
        </li>
        <li className="Navigation-item">
          <a
            className="Navigation-link"
            href="/about"
            onClick={Link.handleClick}
          >About
          </a>
        </li>
      </ul>
    );
  }
}
export default Navigation;
