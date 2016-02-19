import * as React from 'react';
const { Component, PropTypes } = React;
import { Layout } from '../Layout';
import * as DocumentTitle from 'react-document-title';
import { titlePrefix } from '../../config';

export class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string,
  };

  render() {
    const { children, title, ...props } = this.props;
    return (
      <DocumentTitle title={title||titlePrefix}>
        <Layout {...props}>
          {children}
        </Layout>
      </DocumentTitle>
    );
  }
}
