import * as React from 'react';
const { Component, PropTypes } = React;
import {Navigation} from '../Navigation';
import './Layout.scss';

export class Layout extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className="Layout">
        <Navigation />

        {this.props.children}
      </div>
    );
  }

}
