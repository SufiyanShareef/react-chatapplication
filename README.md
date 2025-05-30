# 🔐 Secure Chat Application

A **real-time messaging platform** inspired by WhatsApp and Discord. It features user authentication, encrypted messaging, user profiles with avatars, and support for individual and group chats.

> Built with **React**, **Node.js**, **MongoDB**, and **Socket.IO**.

## 🌐 Live Demo

<div align="center">
  <video src="https://github.com/user-attachments/assets/b9acda18-7ad8-49ca-9690-a614933cd98b" width="400" height="250" controls></video>
</div>

---

## 📦 Tech Stack

* **Frontend:** React, DaisyUI, Tailwind CSS  
* **Backend:** Node.js, Express  
* **Database:** MongoDB  
* **Real-time Communication:** Socket.IO  
* **Authentication:** JWT (JSON Web Tokens)  
* **Encryption:** AES-256-CBC (symmetric encryption for messages)  

---

## ✨ Features

* 🔐 **Secure Authentication** (Register/Login with JWT)  
* 📧 **Real-time Messaging**   
* 🔒 **End-to-End Encrypted Messages**  
* 🖼️ **User Profile with Display Picture Upload**  
* 📥 **Media Sharing**  
* 🌐 **Online/Offline Status**  
* 🔔 **Live Notifications for New Messages**  

---

## 🧰 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SufiyanShareef/react-chatapplication.git
cd react-chatapplication
```

### 2. Backend Setup

```bash
cd server
npm install
```

**Create a `.env` file** in the `/server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ENCRYPTION_KEY=your_32_byte_encryption_key
IV_LENGTH=16
```

Then start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

---

## 📂 Project Structure

```
react-chatapplication/
├── client/              # React frontend
│   ├── src/components/  # Chat UI, Forms, Profile
│   └── ...
├── server/              # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
```

---

## 🔐 Encryption

Messages are encrypted using **AES-256-CBC**. Each message is:

* Encrypted before being saved in MongoDB
* Decrypted when fetched and displayed in the frontend

Encryption keys and IV (Initialization Vector) lengths are securely managed via environment variables.

---

## 🚀 Upcoming Features

* ✅ Emoji picker support
* 📤 File/image sharing in chats
* 📱 Mobile responsiveness
* ⏳ Message timestamps and read receipts
* 🧠 AI assistant integration (experimental)

---

## 🤝 Contributing

Feel free to submit issues or pull requests!

```bash
# Fork this repo
# Create your feature branch
git checkout -b feature/AmazingFeature
# Commit and push
git commit -m 'Add some AmazingFeature'
git push origin feature/AmazingFeature
```

---

## 💬 Contact

* [Sufiyan Shareef](https://github.com/SufiyanShareef)  
* [email](mdsufiyanshareef@gmail.com)

