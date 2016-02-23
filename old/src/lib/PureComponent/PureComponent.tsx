import * as React from 'react';
import * as PureRenderMixin from 'react-addons-pure-render-mixin';

const { Component } = React;

export class PureComponent extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
}
