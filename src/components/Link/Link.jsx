import React, { Component, PropTypes } from 'react';
import Location from '../../lib/Location';
import './Link.scss';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  // noinspection OverlyComplexBooleanExpressionJS
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    state: PropTypes.object,
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleClick = Link.handleClick.bind(this);
  }

  static handleClick = event => {
    let allowTransition = true;
    let clickResult;

    if (this.props && this.props.onClick) {
      clickResult = this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (clickResult === false || event.defaultPrevented === true) {
      allowTransition = false;
    }

    event.preventDefault();

    if (allowTransition) {
      const link = event.currentTarget;
      Location.pushState(this.props && this.props.state || null,
        this.props && this.props.to || (link.pathname + link.search));
    }
  };

  render() {
    // noinspection JSUnusedLocalSymbols
    const { to, children, ...props } = this.props;
    return <a onClick={this.handleClick} {...props}>{children}</a>;
  }

}

export default Link;
