import { createSlice } from '@reduxjs/toolkit';
// import { IS_DEMO } from 'config.js';

const userInfo = {
  id: 1,
  name: 'Blanch',
  thumb: '/img/profile/profile-9.webp',
  role: 'admin',
  email: 'example@gmail.com',
};

const initialState = {
  isLogin: true,
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
  },
});

export const { setCurrentUser } = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
