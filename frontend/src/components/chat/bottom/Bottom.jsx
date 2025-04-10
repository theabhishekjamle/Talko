import React, { useState,useRef } from 'react'
import EmojiPicker  from 'emoji-picker-react'
import './Bottom.css'
import { messageStore } from '../../../store/messagesStore';


export default function Bottom() {

const [emojiopen,setemojiopen] = useState(false);
const [imagePreview,setImagePreview] = useState(null);
const [text,setText] = useState("");
const {sendMessage,isMessageSending} = messageStore();


const fileInputRef = useRef(null);

const handleEmojiClick =  (e) => {
    setText((prev)=>prev+e.emoji);
}

const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (!file || !file.type.startsWith("image/")) {
      return; 
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); 
    };
    reader.readAsDataURL(file); 
}

const removeImage = (e)=>{
    setImagePreview(null);
    if(fileInputRef.current){
        fileInputRef.current.value = "";
    }
}

const handleSendMessage = async()=>{
  if(!text.trim && !imagePreview){
    return;
  }

  try{
    await sendMessage({
        text:text,
        image:imagePreview,
    });

    setText("");
    setImagePreview(null);
    if(fileInputRef.current){
        fileInputRef.current.value="";
    }
  }
  catch(error){
    console.log("failed to send Message",error);
  }
}

  return (
    <div className="messageBox">
    <div className="bottom">
        {imagePreview&&(
            <div id='btom' className='imagepreview'>
                <img src={imagePreview} alt='preview'></img>
                <button onClick={removeImage}>X</button>
            </div>

        )}
        <div id='btom' className="emoji">
          <img src='./images/emoji.png' onClick={()=>setemojiopen((emojiopen)=>!emojiopen)} alt='Emj'/>
          <div className="picker">
          <EmojiPicker open={emojiopen} onEmojiClick={handleEmojiClick}/> 
          </div>
        </div> 
        
        <textarea id='btom' className='messageinput' placeholder='Write a Message' value={text} onChange={e=>setText(e.target.value)}/>
          {!isMessageSending&&(
           <div id='btom' className='icons'>
             <input type='file' accept='image/*'  ref={fileInputRef} onChange={handleImageChange} style={{display:'none'}}></input>
             <button type='button' onClick={()=>fileInputRef.current?.click() } disabled={isMessageSending}  ><img src='./images/folder.png' alt='img'/></button>
             <button onClick={handleSendMessage} disabled={isMessageSending || (!text.trim() && !imagePreview)} ><img src='./images/send.png' alt='send'/></button>
           </div>
          )}
        </div>
        </div>
  )
}