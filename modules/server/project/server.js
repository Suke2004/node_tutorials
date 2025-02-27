import express from "express";
import http from "http";
import multer from "multer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import twilio from "twilio";
import axios from "axios";
import ws from "ws";

dotenv.config();
const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

mongoose.connect(process.env.MONGO_URI);
const User = mongoose.model("User", new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    counter: Number,
    role: { type: String, default: "user" },
    profilePic: String,
    phone: String,
    counterHistory: [{ timestamp: Date, value: Number }]
}));

const JWT_SECRET = process.env.JWT_SECRET;
const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

app.use(express.json());

// 📌 **Multer for File Uploads**
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// 🔐 **JWT Authentication Middleware**
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ error: "No token provided" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Unauthorized" });
        req.user = decoded;
        next();
    });
};

// 📌 **User Registration**
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.json({ success: true, message: "User registered successfully" });
});

// 📌 **User Login (JWT Token)**
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, token });
});

// 📌 **File Upload API**
app.post("/upload", authenticate, upload.single("file"), async (req, res) => {
    await User.updateOne({ _id: req.user.id }, { profilePic: req.file.path });
    res.json({ success: true, filePath: req.file.path });
});

// 📌 **Send OTP via SMS (Twilio)**
app.post("/send-otp", async (req, res) => {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    await twilioClient.messages.create({ body: `Your OTP is ${otp}`, from: "+1234567890", to: phone });
    res.json({ success: true, otp });
});

// 📌 **Counter History API**
app.get("/counter-history", authenticate, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ history: user.counterHistory });
});

// 📌 **AI-Powered Counter Prediction API**
app.get("/counter-predictions", authenticate, async (req, res) => {
    const response = await axios.get("https://api.mock-ai.com/predict", { params: { userId: req.user.id } });
    res.json({ prediction: response.data.predictedValue });
});

// 📌 **Admin Dashboard API**
app.get("/admin/dashboard", authenticate, async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Admin access required" });

    const userCount = await User.countDocuments();
    const mostActive = await User.find().sort({ counter: -1 }).limit(5);
    res.json({ userCount, mostActive });
});

// 📌 **WebSocket Connection for Real-Time Notifications**
server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    });
});

wss.on("connection", (ws) => {
    console.log("WebSocket Connected");
    ws.send("Welcome to real-time notifications!");

    ws.on("message", (msg) => {
        console.log("Received:", msg);
        ws.send(`Message received: ${msg}`);
    });

    ws.on("close", () => console.log("WebSocket Disconnected"));
});

// 📌 **Start the Server**
server.listen(3000, () => console.log("Server running on port 3000"));
