import * as React from 'react';
const { Component } = React;

import { Link } from '../Link';
import './Navigation.scss';

export class Navigation extends Component {

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
        <li className="Navigation-item">
          <a
            className="Navigation-link"
            href="/photo"
            onClick={Link.handleClick}
          >PhotoGallery
          </a>
        </li>
      </ul>
    );
  }
}
