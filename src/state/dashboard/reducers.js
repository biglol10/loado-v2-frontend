import * as types from './types';

const initialState = {
  current: '',
  departmentId: '',
};

// eslint-disable-next-line func-style
function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_DEPARTMENT:
      return {
        ...state,
        departmentId: action.departmentId,
      };
    default:
      return state;
  }
}

export default dashboardReducer;
