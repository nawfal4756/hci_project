import { createSlice } from "@reduxjs/toolkit";

const snackBarSlice = createSlice({
  name: "snackBar",
  initialState: {
    message: "",
    open: false,
    severity: "",
  },
  reducers: {
    openSnackBar: (state, action) => {
      state.message = action.payload.message;
      state.open = true;
      state.severity = action.payload.severity;
    },
    closeSnackBar: (state) => {
      state.open = false;
    },
  },
});

export const { openSnackBar, closeSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
