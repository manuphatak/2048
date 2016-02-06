import React, { Component, PropTypes } from 'react';
import Layout from '../Layout';
import { Provider } from 'react-redux';

class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired,
  };

  render() {
    const { children, store, ...props } = this.props;
    return (
      <Provider store={store}>

        <Layout {...props}>
          {children}
        </Layout>

      </Provider>
    );
  }

}

export default App;
