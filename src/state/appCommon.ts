import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum EDeviceType {
  desktop = 'desktop',
  tab = 'tab',
  mobile = 'mobile',
}

const initialState: {
  deviceType: keyof typeof EDeviceType;
} = {
  deviceType: 'desktop',
};

const loaderSlice = createSlice({
  name: 'appCommon',
  initialState,
  reducers: {
    setDeviceType: (state, action: PayloadAction<keyof typeof EDeviceType>) => {
      state.deviceType = action.payload;
    },
  },
});

export const { setDeviceType } = loaderSlice.actions;
export default loaderSlice.reducer;
