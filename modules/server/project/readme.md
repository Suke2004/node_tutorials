# 🚀 Full-Stack WebSocket API with Authentication & AI-Powered Features  

This project is a **full-stack API** built with **Node.js, Express, WebSockets, and MongoDB**, providing **authentication, file uploads, real-time notifications, AI-powered predictions, and admin dashboard insights**.  

## ✨ **Features**
- 🔒 **JWT Authentication** - Secure user login and token-based access.
- 📁 **File Uploads** - Supports profile picture uploads using **Multer**.
- 📲 **Twilio OTP SMS** - Sends OTP via Twilio API.
- 📊 **Counter History & AI Predictions** - Fetch user activity and AI-powered predictions.
- 🛠️ **Admin Dashboard** - Get user statistics and active users.
- 🔔 **WebSocket Real-Time Notifications** - Supports live data updates.
- 🔄 **Secure & Scalable** - Built using **Mongoose** and **Express.js** with optimized security.

---

## 🛠️ **Installation**
### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/yourusername/fullstack-websocket-api.git
cd fullstack-websocket-api
```

### 2️⃣ **Install Dependencies**
```bash
npm install
```

### 3️⃣ **Set Up Environment Variables**  
Create a `.env` file and add:
```plaintext
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

### 4️⃣ **Run the Server**
```bash
npm start
```

Server will run at **`http://localhost:3000`**. 🎯

---

## 🔗 **API Summary Table**
| API Endpoint              | Method | Authentication | Description |
|---------------------------|--------|---------------|-------------|
| `/register`               | POST   | ❌ No         | Register a new user |
| `/login`                  | POST   | ❌ No         | User login (returns JWT token) |
| `/upload`                 | POST   | ✅ Yes        | Upload a file (Multer) |
| `/send-otp`               | POST   | ❌ No         | Send OTP to a phone number (Twilio) |
| `/counter-history`        | GET    | ✅ Yes        | Get user's counter history |
| `/counter-predictions`    | GET    | ✅ Yes        | Get AI-predicted counter value |
| `/admin/dashboard`        | GET    | ✅ Yes (Admin) | Fetch dashboard statistics |
| `/notifications` (WebSocket) | WS  | ❌ No         | Real-time WebSocket notifications |

---

## 🔑 **Usage Guide**
### 🔹 **1. Register a User**
```bash
curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{"username": "john_doe", "email": "john@example.com", "password": "securepass"}'
```

### 🔹 **2. Login to Get JWT Token**
```bash
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email": "john@example.com", "password": "securepass"}'
```
📌 **Response:** `{ "success": true, "token": "your_jwt_token" }`

### 🔹 **3. Upload a File (Authenticated)**
```bash
curl -X POST http://localhost:3000/upload -H "Authorization: Bearer your_jwt_token" -F "file=@path/to/your/image.jpg"
```

### 🔹 **4. Send OTP via Twilio**
```bash
curl -X POST http://localhost:3000/send-otp -H "Content-Type: application/json" -d '{"phone": "+1234567890"}'
```

### 🔹 **5. Fetch Counter History (Authenticated)**
```bash
curl -X GET http://localhost:3000/counter-history -H "Authorization: Bearer your_jwt_token"
```

### 🔹 **6. Get AI Counter Predictions**
```bash
curl -X GET http://localhost:3000/counter-predictions -H "Authorization: Bearer your_jwt_token"
```

### 🔹 **7. Admin Dashboard Stats**
```bash
curl -X GET http://localhost:3000/admin/dashboard -H "Authorization: Bearer admin_jwt_token"
```

---

## 📡 **WebSocket (Real-Time Notifications)**
To connect via WebSocket, use:
```javascript
const ws = new WebSocket("ws://localhost:3000");
ws.onopen = () => console.log("Connected!");
ws.onmessage = (event) => console.log("New Message:", event.data);
```

---

## 🏆 **Technologies Used**
- **Backend:** Node.js, Express.js, WebSockets
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, Bcrypt.js
- **File Uploads:** Multer
- **Messaging:** Twilio
- **AI Predictions:** Axios (mock AI service)
- **Real-Time Communication:** WebSockets (ws package)

---

## 👨‍💻 **Contributors**
- **Your Name** - *Developer*
- Open for contributions! 🚀

📌 **License:** MIT  
📌 **Version:** 1.0.0  

---

## 📢 **Contact & Support**
Have questions? Feel free to reach out!  
💎 Email: your-email@example.com  
💙 GitHub: [Your GitHub](https://github.com/yourusername)

---

💡 **Happy Coding!** 🚀🔥

