import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// First, define a slice of state for a particular feature.
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      return state + action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      return state - action.payload;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;

// export { increment, decrement, counterReducer };
