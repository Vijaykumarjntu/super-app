import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

const STORAGE_KEY = 'superapp-auth'

export const store = configureStore({
  reducer: { auth: authReducer },
})

// Persist auth slice to localStorage (do not read from localStorage during store creation)
if (typeof window !== 'undefined') {
  store.subscribe(() => {
    try {
      const state = store.getState()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.auth))
    } catch (e) {
      console.warn('Failed to persist state', e)
    }
  })
}

export default store
