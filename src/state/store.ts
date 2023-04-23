import { configureStore, combineReducers, AnyAction, Store } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import modalSlice from './modalSlice';
import loaderSlice from './loaderSlice';
import appCommon from './appCommonSlice';

const rootReducer = combineReducers({
  counter: counterSlice,
  modal: modalSlice,
  loader: loaderSlice,
  appCommon,
});

const devMode = process.env.NODE_ENV === 'development';

export type RootState = ReturnType<typeof rootReducer>;

const store: Store<RootState, AnyAction> = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: devMode,
});

export default store;
