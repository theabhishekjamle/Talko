import { useEffect, useState } from 'react';
import './list.css';
import { messageStore } from '../../../store/messagesStore';
import { userAuthStore } from '../../../store/userAuthStore';

const List = () => {
  const { users, getUsers, setSelectedUser, isUsersLoading } = messageStore();
  const { onlineUsers } = userAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const [searchedUser, setSearchedUser] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const filtered = users
      .filter((user) =>
        user.fullName.toLowerCase().includes(searchedUser.toLowerCase())
      )
      .sort((a, b) => {
        const aOnline = onlineUsers.includes(a._id);
        const bOnline = onlineUsers.includes(b._id);
        if (aOnline !== bOnline) return bOnline - aOnline; 

        const aLastMessage = a.lastMessage?.timestamp || 0;
        const bLastMessage = b.lastMessage?.timestamp || 0;
        return bLastMessage - aLastMessage;
      });

    setFilteredUsers(filtered);
  }, [searchedUser, users, onlineUsers]);

  if (isUsersLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="list">
      <div className="search">
        <div className="searchbar">
          <img src="./images/search.png" alt="Search " />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchedUser(e.target.value)}
          />
        </div>
      </div>

      <div className="items">
        {users.length > 0 ? (
          filteredUsers.map((user) => (
            <button onClick={() => setSelectedUser(user)} key={user._id}>
              <div className="item">
              <img src={user.profilePic} alt={user.fullName?.charAt(0) || "U"} />
                <div className="text">
                  <p>{user.fullName}</p>
                  <span
                    className={onlineUsers.includes(user._id) ? 'online' : 'offline'}
                  >
                    {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </button>
          ))
        ) : (
          <p>No users available</p>
        )}
      </div>
    </div>
  );
};

export default List;
