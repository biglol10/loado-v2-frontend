import { combineReducers } from 'redux';

import dashboardReducer from './dashboard/reducers';

const createRootReducer = () =>
  combineReducers({
    dashboard: dashboardReducer,
  });

export default createRootReducer;
