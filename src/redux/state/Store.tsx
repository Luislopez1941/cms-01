import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const storeSlice = createSlice({
  name: 'store',
  initialState: null,
  reducers: {
    updateStore: (state: any, action: PayloadAction<any | 'reset'>) => {
      if (action.payload === 'reset') {
        return null;
      }
      return { ...state, ...action.payload };
    },
  },
});

export const { updateStore } = storeSlice.actions;

export default updateStore.reducer;
