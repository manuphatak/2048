///<reference path="app.d.ts"/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { Location } from './lib/Location/Location';
import { App } from './components/App/App';
import { titlePrefix } from './config';

import './lib/immutable';

const routes = {}; // Auto-generated on build. See tools/lib/routes-loader.js

function getTitle(path) {
  const titleSuffix = path === '/' ? '' : path.split('/').join(' - ');
  return titlePrefix + titleSuffix;
}

const route = async(path: string, callback) => {
  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1); // eslint-disable-line no-param-reassign
  }

  const handler = routes[ path ] || routes[ '/404' ];
  const componentHandler = await handler();
  const component = typeof componentHandler === 'function' // :off
    ? componentHandler
    : componentHandler.default;  // :on

  await callback(<App title={getTitle(path)}>{React.createElement(component)}</App>);
};

function run(): void {
  const container = document.getElementById('app');
  Location.listen(location => {
    route(location.pathname, async(component) => ReactDOM.render(component, container, () => {
      // Track the page view event via Google Analytics
      // noinspection JSUnresolvedFunction
      window.ga('send', 'pageview');
    }));
  });
}

if (canUseDOM) {
  // Run the application when both DOM is ready
  // and page content is loaded
  if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', run);
  }
  else {
    window.attachEvent('onload', run);
  }
}

export default {
  route,
  routes,
};
