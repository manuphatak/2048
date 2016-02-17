import * as React from 'react';
import { Game } from '../components/Game/__init__';
import { Score } from '../components/Score/__init__';
import { makeStore } from '../app/stores/__init__';
import { Provider } from 'react-redux';
import { storage } from '../lib/storage/storage';
import { setState } from '../app/actionCreators/__init__';

const { Component } = React;

const STORAGE_KEY = '2048_state';

const store = makeStore();
store.dispatch(setState(storage.get, STORAGE_KEY));

store.subscribe(() => {
  storage.set(STORAGE_KEY, store.getState().toJS());
});

export class Page extends Component<{}, {}> {
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
          <Score />

          <Game />
        </div>
      </Provider>
    );
  }
}

export default Page;
