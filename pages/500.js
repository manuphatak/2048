import React, { Component, PropTypes } from 'react';

export default class extends Component {

  static propTypes = {
    error: PropTypes.instanceOf(Error),
  };

  render() {
    const errorMessage = this.props.error
      ? this.props.error.message + '\n\n' + this.props.error.stack
      : 'A critical error occurred.';

    return (
      <div>
        <h1>Error</h1>
        <pre>{errorMessage}</pre>
      </div>
    );
  }

}
