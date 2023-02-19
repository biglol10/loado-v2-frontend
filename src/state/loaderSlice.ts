import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  loaderShow: boolean;
} = {
  loaderShow: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader(state) {
      state.loaderShow = true;
    },
    hideLoader(state) {
      state.loaderShow = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
