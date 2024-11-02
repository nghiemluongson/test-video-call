// token.js
const express = require("express");
const router = express.Router();
const axios = require("axios");

// Mock user database with credentials (Replace with actual DB lookup)
const users = {
  user1: {
    appID: "1145315631",
    serverSecret: "4b191b18c6162eb683a0811e3df4bdfa",
  },
  user2: { appID: "user2_appID", serverSecret: "user2_serverSecret" },
  // Add more users as needed
};

// Function to generate token
function generateKitToken(appID, serverSecret, roomID, userID) {
  return `${appID}-${serverSecret}-${roomID}-${userID}-${Date.now()}`;
}

// POST /generateToken
router.post("/generateToken", async (req, res) => {
  const { username, roomID, userID } = req.body;
  const user = users[username];

  if (!user) {
    return res.status(400).json({ error: "Invalid user credentials" });
  }

  try {
    const kitToken = generateKitToken(
      user.appID,
      user.serverSecret,
      roomID,
      userID
    );
    res.status(200).json({ kitToken });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate token" });
  }
});

module.exports = router;
