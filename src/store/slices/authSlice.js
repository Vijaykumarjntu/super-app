import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  username: '',
  email: '',
  mobile: '',
  categories: [],
  registered: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register(state, action) {
      const { name, username, email, mobile } = action.payload
      state.name = name
      state.username = username
      state.email = email
      state.mobile = mobile
      state.registered = true
    },
    setCategories(state, action) {
      state.categories = action.payload
    },
    reset(state) {
      Object.assign(state, initialState)
    }
  }
})

export const { register, setCategories, reset } = authSlice.actions
export default authSlice.reducer
