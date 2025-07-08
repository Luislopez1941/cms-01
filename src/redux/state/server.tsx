// serverSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServerState {
  baseUrl: string;
}

const initialState: ServerState = {
  baseUrl: 'http://localhost:3000', // URL por defecto
};

const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    setBaseUrl(state, action: PayloadAction<string>) {
      state.baseUrl = action.payload;
    },
  },
});

export const { setBaseUrl } = serverSlice.actions;
export default serverSlice.reducer;
