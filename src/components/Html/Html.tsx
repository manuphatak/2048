import * as React from 'react';
const { Component, PropTypes } = React;
import { GoogleAnalytics } from '../GoogleAnalytics';
import { title, description } from '../../config.ts';

export class Html extends Component {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string.isRequired,
    debug: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <html
        className="no-js"
        lang="en"
      >
        <head>
          <meta charSet="UTF-8"/>
          <meta
            httpEquiv="X-UA-Compatible"
            content="IE=edge"
          />
          <title>{this.props.title || title}</title>
          <meta
            name="description"
            content={this.props.description || description}
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <link
            rel="apple-touch-icon"
            href="apple-touch-icon.png"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto"
          />
          <link
            rel="stylesheet"
            href={`./app.css?${new Date().getTime()}`}
          />
          <script src="./manifest.js"></script>
          <script src="./vendor.js"></script>
          <script src={`./app.js?${new Date().getTime()}`}></script>
        </head>
        <body>
          <div
            id="app"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          <GoogleAnalytics />
        </body>
      </html>
    );
  }

}
