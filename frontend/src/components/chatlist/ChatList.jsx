import './ChatList.css'
import UserInfo from './userinfo/UserInfo'
import List from './list/List'
import { useState } from 'react'
const ChatList = ({visibility}) => {

  const [closeUserList,setCloseUserList] = useState('flex');

  return (
    <div className='ChatList' style={{display:visibility}}>

        <UserInfo/>
        <List/>
        
      </div>
  )
}

export default ChatList