import * as types from './types';

export const setDepartment = (departmentId) => ({
  type: types.SET_DEPARTMENT,
  departmentId,
});
