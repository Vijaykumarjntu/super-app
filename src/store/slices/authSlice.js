import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  categories: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.categories = [];
    },
  },
});

export const { register, setCategories, logout } = authSlice.actions;
export default authSlice.reducer;