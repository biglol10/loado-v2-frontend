import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserRequest {
  method: 'get' | 'post' | 'put';
  url: string;
  data?: string;
}

const initialState: {
  deviceType: 'desktop' | 'tab' | 'mobile';
  userAppId: string;
} = {
  deviceType: 'desktop',
  userAppId: '',
};

const appCommonSlice = createSlice({
  name: 'appCommon',
  initialState,
  reducers: {
    setDeviceType: (state, action: PayloadAction<'desktop' | 'tab' | 'mobile'>) => {
      state.deviceType = action.payload;
    },
    // userAgent정보 추가 필요
    setUserAppId: (state, action: PayloadAction<string>) => {
      state.userAppId = action.payload;
    },
    // setVisitedPages: (state, action: PayloadAction<VisitedPage>) => {
    //   state.visitedPages = [...state.visitedPages, action.payload];
    // },
    // setUserRequests: (state, action: PayloadAction<UserRequest>) => {
    //   state.userRequests = [...state.userRequests, action.payload];
    // },
  },
});

export const { setDeviceType, setUserAppId } = appCommonSlice.actions;
export default appCommonSlice.reducer;
