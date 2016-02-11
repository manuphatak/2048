import React, { Component } from 'react';
import { Motion, spring, TransitionMotion } from 'react-motion';
import uuid from 'node-uuid';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [ // :off
        { key: 'a', size: 10 },
        { key: 'b', size: 20 },
        { key: 'c', size: 30 },
      ],  // :on
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleRemove() {
    this.setState({
      items: [ // :off
        { key: 'a', size: 10 },
        { key: 'b', size: 20 },
      ], // :on
    });
  }

  handleAdd() {
    this.setState({
      items: [ // :off
        { key: 'a', size: 10 },
        { key: 'b', size: 20 },
        { key: uuid.v4(), size: 40 },
      ], // :on
    });
  }

  willLeave(styleThatLeft) {
    console.log('styleThatLeft', styleThatLeft);
    return { width: spring(0), height: spring(0) };
  }

  willEnter(styleThatEntered) {
    console.log('styleThatEntered', styleThatEntered);
    return { width: 0, height: 0 };
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemove}>-</button>
        <button onClick={this.handleAdd}>+</button>
        <TransitionMotion
          willLeave={this.willLeave}
          willEnter={this.willEnter}
          styles={this.state.items.map(item => ({
            key: item.key,
            style: { width: item.size, height: item.size },
          }))}
          defaultStyle={{ width: 0, height: 0 }}
        >
          {styles => (
            <div>
              {styles.map(config => (
                <div
                  key={config.key}
                  style={{ ...config.style, border: '1px solid' }}
                >

                </div>
              ))}
            </div>
          )}

        </TransitionMotion>
      </div>
    );
  }
}

class Page extends Component { //eslint-disable-line react/no-multi-comp
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
        <div>

          <Demo />
        </div>
      </div>
    );
  }

}

export default Page;
