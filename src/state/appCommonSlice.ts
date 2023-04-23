import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  deviceType: 'desktop' | 'tab' | 'mobile';
} = {
  deviceType: 'desktop',
};

const appCommonSlice = createSlice({
  name: 'appCommon',
  initialState,
  reducers: {
    setDeviceType: (state, action: PayloadAction<'desktop' | 'tab' | 'mobile'>) => {
      state.deviceType = action.payload;
    },
  },
});

export const { setDeviceType } = appCommonSlice.actions;
export default appCommonSlice.reducer;
