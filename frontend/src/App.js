import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { userAuthStore } from './store/userAuthStore';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import UploadProfilePic from './pages/UploadProfilePic';
import AnimatedBackground from './pages/AnimatedBackground';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = userAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="loading-screen">
        <AnimatedBackground />
        <div className="loading-text">Loading...</div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <AnimatedBackground />
      <div className="content">
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path='/signup' element={authUser ? <Navigate to="/" /> : <SignUpPage />} />
          <Route path='/login' element={authUser ? <Navigate to="/" /> : <LogInPage />} />
          <Route path='/updateprofile' element={authUser ? <UploadProfilePic /> : <Navigate to="/login" />} />
        </Routes>
      </div>

      <Toaster 
        toastOptions={{
          style: {
            width: '500px', 
            padding: '10px', 
            fontSize: '24px',
            background: 'rgba(30, 41, 59, 0.9)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          },
        }} 
        position="top-center"
      />
    </div>
  );
}

export default App;