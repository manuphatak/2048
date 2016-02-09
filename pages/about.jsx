import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

class Page extends Component {
  render() {
    return (
      <div>
        <h1>About Us</h1>
        <p>Coming soon.</p>
        <Motion
          defaultStyle={{ x: 0 }}
          style={{ x: spring(10) }}
        >
          {value => <div>{value.x}</div>}
        </Motion>
      </div>
    );
  }

}

export default Page;
