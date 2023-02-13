import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import modalSlice from './modalSlice';

const rootReducer = combineReducers({
  counter: counterSlice,
  modal: modalSlice,
});

const devMode = process.env.NODE_ENV === 'development';

export type RootState = ReturnType<typeof rootReducer>;

const store: any = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: devMode,
});

export default store;
