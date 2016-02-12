import React, { Component } from 'react';
import Game from '../components/Game';
import configureStore from '../app/stores/';
import { Provider } from 'react-redux';
import storage from '../lib/storage';
import { setState } from '../app/actionCreators';
const STORAGE_KEY = '2048_state';

const store = configureStore();
store.dispatch(setState(storage.get, STORAGE_KEY));

store.subscribe(() => {
  storage.set(STORAGE_KEY, store.getState().toJS());
});

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store,
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
