import express from "express";
import { requireAuth } from "@clerk/express";
import { chatClient } from "../lib/stream.js";

const router = express.Router();

// POST /api/stream/token
router.post("/token", requireAuth(), (req, res) => {
  try {
    const userId = req.auth.userId; // ✅ from Clerk

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = chatClient.createToken(userId);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating Stream token:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

export default router;
