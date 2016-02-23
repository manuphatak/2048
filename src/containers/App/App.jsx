import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import DocumentTitle from 'react-document-title';
import './App.scss';
import { titlePrefix } from '../../config';

export function App({ store, title }) {
  return (
    <Provider store={store}>

      <DocumentTitle title={title || titlePrefix}>

        <h1>Hello world!!!</h1>

      </DocumentTitle>

    </Provider>
  );
}

App.propTypes = { // :off
  store: PropTypes.object.isRequired,
  title: PropTypes.string,
}; // :on
