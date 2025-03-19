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
          <label>Username</label>
          <div className='input-container'>
            <input
              type="text"
              placeholder="Jhon_123"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
        </div>
        <div className='form-group'>
          <label>E-mail</label>
          <div className='input-container'> 
            <input
              type="email"
              placeholder="jhon123@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group">
          <label>password</label>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="******"
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
              {showPassword ? "🙈" : "👁️"}
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
