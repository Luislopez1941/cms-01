import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: null,
  reducers: {
    updateCategories: (state: any, action: PayloadAction<any | 'reset'>) => {
      if (action.payload === 'reset') {
        return null;
      }
      return { ...state, ...action.payload };
    },
  },
});

export const { updateCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
