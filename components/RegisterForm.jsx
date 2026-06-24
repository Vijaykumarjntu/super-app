import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../src/store/slices/authSlice';

export default function RegisterForm({ onNext }) {
  const dispatch = useDispatch();
  
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    mobile: ''
  });

  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Field is required';
    if (!form.username.trim()) newErrors.username = 'Field is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Field is required';
    if (!form.mobile.trim() || form.mobile.length < 10) newErrors.mobile = 'Field is required';
    if (!agreed) newErrors.agreed = 'Please agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(register(form));
      onNext();
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold neon-green">Super app</h1>
        <p className="text-gray-400 mt-1">Create your new account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {['name', 'username', 'email', 'mobile'].map((field) => (
          <div key={field}>
            <input
              type={field === 'email' ? 'email' : field === 'mobile' ? 'tel' : 'text'}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              className={`input-field w-full px-4 py-3.5 rounded-xl text-sm placeholder-gray-500 ${errors[field] ? 'error-input' : ''}`}
            />
            {errors[field] && <p className="error-text text-xs mt-1.5">{errors[field]}</p>}
          </div>
        ))}

        <div className="flex items-start gap-3 mt-4">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 accent-[#39ff14] scale-110 cursor-pointer"
          />
          <p className="text-xs text-gray-400 leading-relaxed">
            By clicking on Sign up, you agree to Superapp Terms and Conditions of Use.
          </p>
        </div>

        {/* Figma Matching Button */}
        <button
          type="submit"
          className="w-full bg-[#39ff14] hover:bg-[#2be50f] active:bg-[#25d20c] 
                     text-black font-semibold py-3.5 rounded-full 
                     transition-all mt-6 text-base tracking-wide
                     shadow-lg shadow-[#39ff14]/50 hover:shadow-xl"
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
}