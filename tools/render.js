import glob from 'glob';
import { join, dirname } from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';

import { Html } from '../src/components/Html';
import task from './lib/task';
import fs from './lib/fs';

const DEBUG = !process.argv.includes('release');

function getPages() {
  return new Promise((resolve, reject) => {
    glob('**/*.{ts,tsx}', { cwd: join(__dirname, '../src/pages') }, (err, files) => {
      if (err) {
        reject(err);
      }
      else {
        const result = files.map(file => {
          let path = `/${file.substr(0, file.lastIndexOf('.'))}`;
          if (path === '/index') {
            path = '/';
          }
          else if (path.endsWith('/index')) {
            path = path.substr(0, path.lastIndexOf('/index'));
          }

          return { path, file };
        });
        resolve(result);
      }
    });
  });
}

async function renderPage(page, component) {
  const data = { body: ReactDOM.renderToString(component) };
  const filename = page.file.substr(0, page.file.lastIndexOf('.'));
  const file = join(__dirname, '../build', `${filename}.html`);
  const htmlInner = ReactDOM.renderToStaticMarkup(<Html debug={DEBUG} {...data} />);
  const html = `<!doctype html>\n${htmlInner}`;
  await fs.mkdir(dirname(file));
  await fs.writeFile(file, html);
}

export default task(async function render() {
  const pages = await getPages();
  const { route } = require('../build/app.node').default;
  for (const page of pages) {
    await route(page.path, renderPage.bind(undefined, page));
  }
});
