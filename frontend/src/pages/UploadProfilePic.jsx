import React, { useState } from 'react';
import { userAuthStore } from '../store/userAuthStore';
import toast from 'react-hot-toast';
import './uploadProfilePic.css';

export default function UploadProfilePic() {

  const { authUser, uploadProfilePic,logOut } = userAuthStore();
  const [selectedImage, setSelectedImage] = useState('');
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
    };
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error('select an image to upload.');
      return;
    }
    await uploadProfilePic({ profilePic: selectedImage });
  };

  return (
    <div className="upload-container">
      <a href='/' style={{alignSelf:'flex-start'}}><img src='images/redleftarrow.png' alt='Back' style={{height:'30px'}}></img></a>
      <div className="profile-container">
        <div className="profilepic">
          <img src={selectedImage || authUser.profilePic} alt="Profile" />
        </div>
        <form onSubmit={handleImageSubmit}>
          <label htmlFor="upload-profile" className="upload-label">
            <img src="images/camera.png" alt="Upload" className="camera-icon" />
          </label>
          <input
            id="upload-profile"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <input type="submit" id='updatebtn' value="Update Profile" />
        </form>
        <div className="details-container">
          <div className="details">
            <p>Username :</p>
            <p>{authUser.fullName}</p>
          </div>
          <div className="details">
            <p>Email :</p>
            <p>{authUser.email}</p>
          </div>
          <div className="details">
            <p>Since : </p>
            <p>{new Date(authUser.createdAt).toLocaleDateString('en-GB')}</p>
          </div>
          <div className='icons'>
            <button id='logoutbtn' onClick={logOut} alt='logout' >Logout</button>
           
          </div>      
        </div>
      </div>
    </div>
  );
}
