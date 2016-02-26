import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { titlePrefix } from '../../config';

import { Layout } from '../../components/Layout';

export function App({ store, title }) {
  return (
    <Provider store={store}>

      <DocumentTitle title={title || titlePrefix}>

        <Layout />

      </DocumentTitle>

    </Provider>
  );
}

App.propTypes = { // :off
  store: PropTypes.object.isRequired,
  title: PropTypes.string,
}; // :on
