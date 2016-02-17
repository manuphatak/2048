import * as React from 'react';
const { Component, PropTypes } = React;
import {Layout} from '../Layout';


export class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    const { children, ...props } = this.props;
    return (
      <Layout {...props}>
        {children}
      </Layout>
    );
  }
}
