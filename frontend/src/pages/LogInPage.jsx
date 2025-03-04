import React, { useState } from "react";
import { userAuthStore } from "../store/userAuthStore";
import { Navigate } from "react-router-dom";
import "./LoginPage.css"; 
import toast from "react-hot-toast";

export default function LogInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { logIn, isLoggingIn } = userAuthStore();

  const validateform = (formData)=>{
    const {email,password} = formData;
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
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateform(formData)){
        logIn(formData);  
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="abc123@gmail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="*****"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
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
          <p><a href="/signup">SignUp</a></p>
            <button
              type="submit"
              className="login-button"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>
        </div>
      </form>
    </div>
  );
}
