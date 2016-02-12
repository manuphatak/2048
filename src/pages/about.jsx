/* eslint no-console:0 */
import React, { Component } from 'react';
import { Motion, spring, TransitionMotion } from 'react-motion';
import uuid from 'node-uuid';
import assert from 'assert';

function* count(n) {
  for (let x = 0; x < n; x++) {
    yield x;
  }
}

const sentinel = new Error('foo');
function* demo() {
  try {
    yield 10;
  }
  catch (error) {
    assert(error === sentinel);
  }
}

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

  componentWillUpdate() {
    console.log(uuid.v4());
    for (const x of count(5)) {
      console.log('x', x);
    }
    const d = demo();
    const A = d.next();
    console.log('A', A);
    const C = d.throw(sentinel);
    console.log('C', C);
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

  willLeave() {
    return { width: spring(0), height: spring(0) };
  }

  willEnter() {
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
