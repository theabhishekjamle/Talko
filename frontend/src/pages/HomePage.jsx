import { useState } from 'react';
import './HomePage.css'
import ChatList from'../components/chatlist/ChatList.jsx';
import Chat from '../components/chat/Chat.jsx'
export default function HomePage(){

    const [chatListVisibility,setChatListVisibility] = useState('flex');

    return(
        <div className='homePageBox'>
            <ChatList visibility={chatListVisibility}/>
            <Chat setChatListVisibility={setChatListVisibility} />
        </div>
    )
}