import task from './lib/task';

export default task(async function build() {
  await require('./clean').default();
  await require('./copy').default();
  await require('./bundle').default();
  await require('./render').default();
});
