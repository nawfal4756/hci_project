import { createSlice } from "@reduxjs/toolkit";

const snackBarSlice = createSlice({
  name: "snackBar",
  initialState: {
    message: "",
    open: false,
  },
  reducers: {
    openSnackBar: (state, action) => {
      state.message = action.payload;
      state.open = true;
    },
    closeSnackBar: (state) => {
      state.open = false;
    },
  },
});

export const { openSnackBar, closeSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
