const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

router.get('/chats', async (req, res) => {
  try {
    const chats = await Chat.find().sort({ timestamp: -1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/chats', async (req, res) => {
  const chat = new Chat({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  try {
    const newChat = await chat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
