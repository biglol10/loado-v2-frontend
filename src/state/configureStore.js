import { createStore } from 'redux';
import createRootReducer from './createRootReducer';

const configureStore = (preloadedState) => createStore(createRootReducer);

export default configureStore;
