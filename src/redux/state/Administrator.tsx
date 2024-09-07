import { createSlice } from '@reduxjs/toolkit';


export const administratorSlice = createSlice({
  name: 'administrator',
  initialState: null,
  reducers: {
    updateAdministrator: (state: any, action) => {
      const result = { ...state, ...action.payload };
      return result;
    },
  }
});

export const { updateAdministrator } = administratorSlice.actions;

export default administratorSlice.reducer;