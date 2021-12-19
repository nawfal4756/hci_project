import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    loggedIn: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.loggedIn = true;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
      state.loggedIn = false;
    },
    updateUser: (state, action) => {
      state.currentUser.street = action.payload.street;
      state.currentUser.area = action.payload.area;
      state.currentUser.city = action.payload.city;
      state.currentUser.state = action.payload.state;
      state.currentUser.phone = action.payload.phone;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
