import { useEffect, useRef, useState } from 'react';
import Details from '../details/Details.jsx';
import Bottom from './bottom/Bottom.jsx';
import './Chat.css';
import { messageStore } from '../../store/messagesStore.js';
import { useImageViewStore } from '../../store/imageviewstore.js';

const Chat = ({setChatListVisibility}) => {
  const { selectedUser, getMessages, messages, isMessageSending,subscribeToMessages,unSubscribeFromMessages } = messageStore();
  const {isImageInView,selectedImageURL,setImageView,setImageURL} = useImageViewStore();
  const [detailsVisibility, setDetailsVisibility] = useState('none');

  const endRef = useRef(null);

  useEffect(() => {
    getMessages();
    subscribeToMessages();

    return ()=> unSubscribeFromMessages();

  }, [selectedUser, isMessageSending,getMessages,subscribeToMessages,unSubscribeFromMessages]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      endRef.current?.scrollIntoView();
    }
  }, [messages]);


  const handleImageView = (image) => {
    setImageView(true);
    setImageURL(image);
  };

  const handleImageViewClose = () => {
    setImageURL('');
    setImageView(false);
  };

  const groupMessagesByDate = (messages) => {
    const grouped = messages.reduce((acc, msg) => {
      const date = new Date(msg.createdAt).toLocaleDateString('en-GB'); 
      if (!acc[date]) acc[date] = [];
      acc[date].push(msg);
      return acc;
    }, {});
    return Object.entries(grouped); 
  };

  if (!selectedUser) {
    return (
      <div className="chatcontainer">
        <div className="Chat"></div>
      </div>
    );
  }

  return (
    <div className="chatcontainer">
      <div
        className="Chat"
        style={{ borderRight: detailsVisibility === 'none' ? 'none' : '' }}
      >
        <div className="top">
          <div className="user">
            <img 
              className='chatlistvisibility'
              src='./images/menuicon.png' 
              alt='...'
              width={'20px'} 
              onClick={()=>setChatListVisibility((prev)=>prev==='flex'?'none':'flex')}>
              
            </img>
            <img
              className='userprofile'
              src={selectedUser.profilePic} 
              onClick={() => handleImageView(selectedUser.profilePic)}
              alt="Profile"
            />
            <div className="texts">
              <span>{selectedUser.fullName}</span>
            </div>
          </div>
          <div className="icons">
            <button
              onClick={() =>
                setDetailsVisibility((prev) => (prev === 'none' ? 'flex' : 'none'))
              }
            >
              <img src="./images/more.png" alt="=" />
            </button>
          </div>
        </div>

        <div className="center">
          {isImageInView && (
            <div className="ImageView">
              <button onClick={handleImageViewClose}>X</button>
              <img src={selectedImageURL} alt="Selected" />
            </div>
          )}

          {!isImageInView &&
            
              groupMessagesByDate(messages).map(([date,msgs])=>(
                  <div key={date} className='dategroupeddiv'>
                    <div className='dateseperator'>
                      <span>{date}</span>
                    </div>
                    {
                      msgs.map((msg) => (
                        <div
                          className={msg.senderId === selectedUser._id ? 'sendermessage' : 'ourmessage'}
                          key={msg._id}
                        >
                          {msg.image && (
                              <img
                                src={msg.image}
                                onClick={() => handleImageView(msg.image)}
                                alt="Message Attachment"
                              />
                            )}
                          <div className="texts">
                            {msg.text && (
                              <div>
                                <p>{msg.text}</p>
                              </div>
                            )}
                            <span>
                              {new Date(msg.createdAt).toLocaleString('en-GB', {hour12: false,hour: '2-digit',minute: '2-digit',}).replace(',', '')}
                            </span>
                          </div>
                        </div>
                      ))
                    }

                  </div>
                  
                  
              ))
            
          }

          <div ref={endRef}></div>
        </div>
        <Bottom />
      </div>
      <Details style={{ display: detailsVisibility }} props={handleImageView} />
    </div>
  );
};

export default Chat;
