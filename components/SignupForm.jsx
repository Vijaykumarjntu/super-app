'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setUser } from '@/src/store/slices/authSlice';

export default function SignupForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    mobile: '',
    shareData: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation rules
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
        break;

      case 'username':
        if (!value.trim()) error = 'Username is required';
        else if (value.trim().length < 3) error = 'Username must be at least 3 characters';
        else if (!/^[a-zA-Z0-9_-]+$/.test(value)) error = 'Username can only contain letters, numbers, _ and -';
        break;

      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email address';
        break;

      case 'mobile':
        if (!value.trim()) error = 'Mobile number is required';
        else if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) error = 'Mobile must be 10 digits';
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== 'shareData') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (!formData.shareData) {
      newErrors.shareData = 'Check this box if you want to proceed';
    }

    setTouched({
      name: true,
      username: true,
      email: true,
      mobile: true,
      shareData: true,
    });

    setErrors(newErrors);

    // If no errors, proceed
    if (Object.keys(newErrors).length === 0) {
      dispatch(setUser(formData));
      router.push('/onboarding');
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Brand Title */}
      <h1
        className="mb-2"
        style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#6BE06B',
          fontFamily: 'cursive',
          textAlign: 'center',
        }}
      >
        Super app
      </h1>

      {/* Subtitle */}
      <p
        className="text-center mb-8"
        style={{
          color: '#BDBDBD',
          fontSize: '14px',
        }}
      >
        Create your new account
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name Field */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full h-12 px-4 bg-[#1A1A1A] border-2 text-white placeholder-[#666] focus:outline-none transition ${
              touched.name && errors.name ? 'border-[#ff3333]' : 'border-transparent focus:border-[#6BE06B]'
            }`}
          />
          {touched.name && errors.name && (
            <p className="text-[#ff3333] text-[11px] mt-1">{errors.name}</p>
          )}
        </div>

        {/* Username Field */}
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full h-12 px-4 bg-[#1A1A1A] border-2 text-white placeholder-[#666] focus:outline-none transition ${
              touched.username && errors.username ? 'border-[#ff3333]' : 'border-transparent focus:border-[#6BE06B]'
            }`}
          />
          {touched.username && errors.username && (
            <p className="text-[#ff3333] text-[11px] mt-1">{errors.username}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full h-12 px-4 bg-[#1A1A1A] border-2 text-white placeholder-[#666] focus:outline-none transition ${
              touched.email && errors.email ? 'border-[#ff3333]' : 'border-transparent focus:border-[#6BE06B]'
            }`}
          />
          {touched.email && errors.email && (
            <p className="text-[#ff3333] text-[11px] mt-1">{errors.email}</p>
          )}
        </div>

        {/* Mobile Field */}
        <div>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full h-12 px-4 bg-[#1A1A1A] border-2 text-white placeholder-[#666] focus:outline-none transition ${
              touched.mobile && errors.mobile ? 'border-[#ff3333]' : 'border-transparent focus:border-[#6BE06B]'
            }`}
          />
          {touched.mobile && errors.mobile && (
            <p className="text-[#ff3333] text-[11px] mt-1">{errors.mobile}</p>
          )}
        </div>

        {/* Checkbox */}
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="shareData"
              id="shareData"
              checked={formData.shareData}
              onChange={handleChange}
              className={`w-4 h-4 cursor-pointer ${errors.shareData ? 'border-[#ff3333]' : ''}`}
            />
            <label
              htmlFor="shareData"
              className="text-sm cursor-pointer"
              style={{ color: '#999' }}
            >
              Share my registration data with Superapp
            </label>
          </div>
          {errors.shareData && (
            <p className="text-[#ff3333] text-[11px] mt-1 ml-7">{errors.shareData}</p>
          )}
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full h-13 bg-[#6BE06B] text-white font-bold rounded-full mt-8 transition hover:bg-[#57d457] active:scale-95"
          style={{
            fontSize: '16px',
            height: '52px',
          }}
        >
          Sign Up
        </button>
      </form>

      {/* Legal Text */}
      <p
        className="text-center mt-6 leading-relaxed max-w-sm mx-auto"
        style={{
          fontSize: '10px',
          color: '#777',
          lineHeight: '1.5',
        }}
      >
        By signing up, you agree to our{' '}
        <a href="#" className="text-[#6BE06B] hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-[#6BE06B] hover:underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
