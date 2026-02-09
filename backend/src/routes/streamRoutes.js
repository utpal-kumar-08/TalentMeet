import express from "express";
import { chatClient } from "../lib/stream.js";

const router = express.Router();

// POST /api/stream/token - Generate Stream token for user
router.post("/token", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Generate token for the user
    const token = chatClient.createToken(userId);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating Stream token:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

export default router;
