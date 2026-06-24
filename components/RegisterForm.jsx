import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { register } from '../src/store/slices/authSlice'

export default function RegisterForm(){
  const dispatch = useDispatch()
  const router = useRouter()
  const [formData, setFormData] = useState({ name:'', username:'', email:'', mobile:'', agreeToTerms:false })
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Field is required'
    if (!formData.username.trim()) newErrors.username = 'Field is required'

    if (!formData.email.trim()) newErrors.email = 'Field is required'
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!re.test(formData.email)) newErrors.email = 'Enter a valid email'
    }

    if (!formData.mobile.trim()) newErrors.mobile = 'Field is required'
    else {
      const digits = formData.mobile.replace(/[^0-9]/g, '')
      if (digits.length < 7 || digits.length > 15) newErrors.mobile = 'Enter a valid mobile number'
    }

    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'Check this box to proceed'

    if (Object.keys(newErrors).length) return setErrors(newErrors)

    dispatch(register({ name: formData.name, username: formData.username, email: formData.email, mobile: formData.mobile }))
    router.push('/onboarding')
  }

  return (
    <div className="w-full max-w-md mx-auto py-8">
      <h1 className="text-3xl font-bold neon-green mb-2">Super app</h1>
      <p className="text-gray-400 mb-6">Create your new account</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className={`w-full p-3 rounded input-field ${errors.name ? 'error-input' : ''}`} />
          {errors.name && <div className="text-xs mt-1 error-text">{errors.name}</div>}
        </div>
        <div>
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" className={`w-full p-3 rounded input-field ${errors.username ? 'error-input' : ''}`} />
          {errors.username && <div className="text-xs mt-1 error-text">{errors.username}</div>}
        </div>
        <div>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={`w-full p-3 rounded input-field ${errors.email ? 'error-input' : ''}`} />
          {errors.email && <div className="text-xs mt-1 error-text">{errors.email}</div>}
        </div>
        <div>
          <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" className={`w-full p-3 rounded input-field ${errors.mobile ? 'error-input' : ''}`} />
          {errors.mobile && <div className="text-xs mt-1 error-text">{errors.mobile}</div>}
        </div>
        <label className="flex items-center gap-2 text-gray-400 text-sm">
          <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} className="accent-neon-green" />
          <span>Share my registration data with Superapp</span>
        </label>
        {errors.agreeToTerms && <div className="text-xs error-text">{errors.agreeToTerms}</div>}

        <button type="submit" className="w-full py-3 bg-neon-green text-black rounded-full font-semibold">SIGN UP</button>
      </form>
    </div>
  )
}
