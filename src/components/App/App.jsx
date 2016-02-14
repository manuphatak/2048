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
Map.prototype.updateGrid = function updateGrid(col, row) { // eslint-disable-line no-extend-native
  return this.merge({ col, row });
};
