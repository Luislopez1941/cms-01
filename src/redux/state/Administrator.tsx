import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const administratorSlice = createSlice({
  name: 'administrator',
  initialState: null,
  reducers: {
    updateAdministrator: (state: any, action: PayloadAction<any | 'reset'>) => {
      if (action.payload === 'reset') {
        return null;
      }
      return { ...state, ...action.payload };
    },
  },
});

export const { updateAdministrator } = administratorSlice.actions;

export default administratorSlice.reducer;
