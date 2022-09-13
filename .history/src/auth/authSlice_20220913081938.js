import { createSlice } from '@reduxjs/toolkit';
// import { IS_DEMO } from 'config.js';

const userInfo = {
  thumb: '/img/profile/profile-9.webp',
  role: 'user',
};

const initialState = {
  isLogin: false,
  currentUser: userInfo,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isLogin = true;
    },
    Logout(state, action) {
      state.currentUser = action.payload;
      state.isLogin = false;
    },
  },
});

export const { setCurrentUser, Logout } = authSlice.actions;
export const loginUser = (state) => state.auth.currentUser;
const authReducer = authSlice.reducer;

export default authReducer;
