import { createSlice } from "@reduxjs/toolkit";

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: '', // Estado inicial como una cadena vacía
  reducers: {
    modal: (_: any, action) => {
      return action.payload; // Actualiza el estado con el nuevo nombre del modal
    }
  }
});

// Exportar la acción generada
export const { modal } = modalsSlice.actions;

// Exportar el reducer
export default modalsSlice.reducer;
