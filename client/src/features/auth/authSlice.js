import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('User')) || { user: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('User',JSON.stringify({user:state.user}))
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('User'); 
    },
  },
});

export const { setUser , logoutUser} = authSlice.actions;
export default authSlice.reducer
