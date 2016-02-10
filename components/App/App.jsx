import React, { Component, PropTypes } from 'react';
import Layout from '../Layout';

class App extends Component {

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

export default App;
