import React, { useState } from 'react';
import { userAuthStore } from '../store/userAuthStore';
import './LoginPage.css'
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const {signUp,isSigningUp} = userAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  

  const validateForm = () => {
    const { fullName, email, password } = formData;
  
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      toast.error('Enter All Fields')
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid E-mail');
      return false;
    }

    if (password.length < 6) {
      toast.error('Password should be atleast 6');
      return false;
    }
    return true;
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
        setFormData({ fullName: '', email: '', password: '' });
        signUp(formData);
    }
};


  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit} className='signup-form'>
        <h2>Signup</h2>
        <div className='form-group'>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <input
            type="email"
            placeholder="E-Mail"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="btndiv">
          <p><a href="/login">Login</a></p>
            <button
              type="submit"
              className="login-button"
              disabled={isSigningUp}
            >
              {isSigningUp ? "Signing in..." : "Sign Up"}
            </button>
        </div>      </form>
    </div>
  );
}
