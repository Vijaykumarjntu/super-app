import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { register } from '../src/store/slices/authSlice'

export default function RegisterForm() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [form, setForm] = useState({ name: '', username: '', email: '', mobile: '' })
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.username.trim() || form.username.length < 3) e.username = 'Username must be 3+ chars'
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = 'Invalid email'
    if (!form.mobile.match(/^\d{7,15}$/)) e.mobile = 'Mobile must be 7-15 digits'
    return e
  }

  function onChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) {
      dispatch(register(form))
      // Navigate to category onboarding
      router.push('/onboarding')
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input name="name" value={form.name} onChange={onChange} className="input" />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Username</label>
        <input name="username" value={form.username} onChange={onChange} className="input" />
        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input name="email" value={form.email} onChange={onChange} className="input" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Mobile</label>
        <input name="mobile" value={form.mobile} onChange={onChange} className="input" />
        {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Register</button>
      </div>
    </form>
  )
}

