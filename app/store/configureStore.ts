//const configureStore = process.env.NODE_ENV === 'production' ? require('./configureStore.production.ts') : require('./configureStore.development.ts');
import configureStore from './configureStore.development';
export default configureStore;