import { createSlice } from '@reduxjs/toolkit';
// import { IS_DEMO } from 'config.js';

const initialState = {
  isLogin: false,
  currentUser: "",
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isLogin = true;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
