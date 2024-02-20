const express = require("express");
const router = express.Router();
const fs = require("fs");

const MESSAGE_FILE = "messages.txt";

if (!fs.existsSync(MESSAGE_FILE)) {
  fs.writeFileSync(MESSAGE_FILE, "");
}

router.get("/", (req, res, next) => {
  const messages = fs.readFileSync(MESSAGE_FILE, "utf8");
  res.send(`<h1>Messages</h1><pre>${messages}</pre>
    <form action="/message" method="POST">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      <label for="message">Message:</label>
      <textarea id="message" name="message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  `);
});

router.post("/message", (req, res, next) => {
  const username = req.body.username;
  const message = req.body.message;

  const newMessage = `${username}: ${message}\n`;

  fs.appendFileSync(MESSAGE_FILE, newMessage);

  res.redirect("/");
});

module.exports = router;
