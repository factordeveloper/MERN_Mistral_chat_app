const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Message = require('./models/Message');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para crear un nuevo mensaje
app.post('/api/messages', async (req, res) => {
    const { sender, content } = req.body;
    try {
        const message = new Message({ sender, content });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: "Error creating message" });
    }
});

// Ruta para obtener todos los mensajes
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
