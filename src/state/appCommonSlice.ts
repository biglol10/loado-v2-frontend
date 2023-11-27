import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface VisitedPage {
  pageId: string;
  date: string;
}

export interface UserRequest {
  method: 'get' | 'post' | 'put';
  url: string;
  date: string;
  data?: string;
}

const initialState: {
  deviceType: 'desktop' | 'tab' | 'mobile';
  userAppId: string;
  visitedPages: VisitedPage[];
  userRequests: UserRequest[];
} = {
  deviceType: 'desktop',
  userAppId: 'asdf',
  visitedPages: [],
  userRequests: [],
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
    setVisitedPages: (state, action: PayloadAction<VisitedPage>) => {
      state.visitedPages = [...state.visitedPages, action.payload];
    },
    setUserRequests: (state, action: PayloadAction<UserRequest>) => {
      state.userRequests = [...state.userRequests, action.payload];
    },
  },
});

export const { setDeviceType, setUserAppId, setVisitedPages, setUserRequests } =
  appCommonSlice.actions;
export default appCommonSlice.reducer;
