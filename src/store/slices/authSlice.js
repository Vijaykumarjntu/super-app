import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  categories: [],
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.error = null
    },
    register: (state, action) => {
      state.user = { ...(action.payload || {}), registered: true }
      if (state.categories && state.categories.length) state.user.categories = state.categories
    },
    setCategories: (state, action) => {
      state.categories = action.payload || []
      if (state.user) state.user.categories = state.categories
    },
    logout: (state) => {
      state.user = null
      state.categories = []
      state.error = null
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  }
})

export const { setUser, register, setCategories, logout, setError } = authSlice.actions
export default authSlice.reducer
