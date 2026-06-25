import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../src/store'
import { useEffect } from 'react'
import { setUser, setCategories } from '../src/store/slices/authSlice'

function MyApp({ Component, pageProps }) {
  // Hydrate store from localStorage on client after mount to avoid SSR hydration mismatch
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      const raw = localStorage.getItem('superapp-auth')
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (parsed) {
        if (parsed.user) store.dispatch(setUser(parsed.user))
        if (parsed.categories) store.dispatch(setCategories(parsed.categories))
      }
    } catch (e) {
      console.warn('Failed to hydrate store from localStorage', e)
    }
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
