import './Details.css';
import { messageStore } from '../../store/messagesStore';

const Details = ({ style,props }) => {
  const { selectedUser, messages,deleteChat } = messageStore();
  const handleImageView = props;

  const handleImageDownload = async (imageUrl) => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = "downloaded_image.jpg"; 
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error downloading the image:", error);
    }
  };

  return (
    <div className="Details" style={style}>
      <div className="user">
        <img src={selectedUser.profilePic} onClick={()=>handleImageView(selectedUser.profilePic)} alt="U" />
        <span>{selectedUser.fullName}</span>
        <p>
          Joined On:{" "}
          {new Date(selectedUser.createdAt)
            .toLocaleString("en-GB", {
              hour12: false,
              day: "2-digit",
              month: "2-digit",
              year: "2-digit"
            })
            .replace(",", "")}
        </p>
      </div>

      <div className="options">
        <div className="title">
          <h5>Media</h5>
        </div>
        <div className="images">
          {messages
            .filter((msg) => msg.image) 
            .map((msg) => (
              <div key={msg._id} className="image-item">
                <img src={msg.image} alt="Media" onClick={() => handleImageView(msg.image)} />
                <img src='./images/downloadicon.png' alt='D' width={'25px'} onClick={()=>handleImageDownload(msg.image)}></img>
                <p>
                  {new Date(msg.createdAt).toLocaleString("en-GB", {
                    hour12: false,
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <img  src={msg.senderId === selectedUser._id ? "./images/whiteleftarrow.png" : "./images/whiterightarrow.png"} className='arrowindicators' alt='I'></img>
              </div>
            ))}
        </div>
      </div>

      <div className="buttons">
        <button className="blockuserbtn" onClick={()=>deleteChat()}>Clear Chat</button>
      </div>
    </div>
  );
};

export default Details;
