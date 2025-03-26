# MERN Chat App

A real-time chat application built with the **MERN** stack (**MongoDB, Express.js, React, Node.js**) featuring authentication, real-time messaging, and media sharing.

## Features
- 🔐 **User Authentication** (JWT-based Login & Signup)
- 💬 **Real-time Chat** (Socket.io)
- 📂 **Media Sharing** (Images )
- 🟢 **Online/Offline Status**
- 📜 **Chat History Storage** (MongoDB)
- 🎨 **Responsive UI** (React)

## Tech Stack
- **Frontend:** React.js, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Real-time Communication:** Socket.io
- **Authentication:** JWT (JSON Web Token)

## Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/mustang006/MERN_CHATAPP.git
cd MERN_CHATAPP
```

### 2️⃣ Install Dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd ../frontend
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the **backend** folder and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the App
#### Start the Backend Server
```sh
cd backend
npm start
```
#### Start the Frontend
```sh
cd frontend
npm start
```

### 5️⃣ Open in Browser
Go to `http://localhost:3000/` to access the chat app.

## Folder Structure
```
MERN_CHATAPP/
│── backend/      # Express.js backend
│── frontend/     # React frontend
│── .gitignore    # Git ignored files
│── README.md     # Project documentation
```

## Future Improvements
- 📞 **Voice & Video Calls**
- 🏷 **Message Reactions & Emojis**

## Contributing
Feel free to fork the repo and submit pull requests. Contributions are welcome! 




