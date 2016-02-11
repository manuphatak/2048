import React, { Component } from 'react';
import Game from '../components/Game';
import makeStore from '../app/stores';
import { Provider } from 'react-redux';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: makeStore(),
    };
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <div>
          <h1>Home Page</h1>

          <Game />
        </div>
      </Provider>
    );
  }
}

export default Page;
