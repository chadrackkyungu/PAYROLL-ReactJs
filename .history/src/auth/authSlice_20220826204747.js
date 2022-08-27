import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO } from 'config.js';

const userInfo = {
  id: 1,
  name: 'Lisa Jackson',
  thumb: '/img/profile/profile-9.webp',
  role: 'editor',
  email: 'lisajackson@gmail.com',
}
const initialState = {
  isLogin: IS_DEMO,
  currentUser: IS_DEMO ? userInfo : {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isLogin = false;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
