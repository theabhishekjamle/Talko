import './App.css';
import { Routes,Route, Navigate } from 'react-router-dom';
import { userAuthStore } from './store/userAuthStore';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import  HomePage  from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import UploadProfilePic from './pages/UploadProfilePic';
function App() {

  const {authUser,checkAuth,isCheckingAuth} = userAuthStore();
 
useEffect(()=>{
  checkAuth();
},[checkAuth]);

if(isCheckingAuth){
  return (
    <div>loading..........</div>
  )
}

  return (
    <div >
      <Routes>
        <Route path="/" element={authUser? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={authUser ? <Navigate to="/"/> : <SignUpPage/>}></Route>
        <Route path='/login' element={authUser ? <Navigate to="/"/> : <LogInPage/>}></Route>
        <Route path='/updateprofile' element={authUser ? <UploadProfilePic/>:<Navigate to="/login"/> }></Route>
      </Routes>

      <Toaster toastOptions={{
          style: {
            width: '500px', padding: '10px', fontSize: '24px', 
          },
        }} />
    </div>
  );
}

export default App;
