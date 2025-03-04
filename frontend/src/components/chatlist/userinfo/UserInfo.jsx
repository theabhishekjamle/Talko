import './userinfo.css'
import { userAuthStore } from '../../../store/userAuthStore'
const UserInfo = () => {

   const {authUser,logOut} = userAuthStore();
  return (
    <div className='userinfo'>
        <div className="user">
          <a href='./updateprofile'><img src={authUser.profilePic} alt=""/></a>
            <p>{authUser.fullName}</p>
        </div>
 
    </div>
  )
}

export default UserInfo