import express from "express";
import Webinar from "../models/webinar.js";
import User from "../models/user.js";

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, description, date, speaker, host } = req.body;

    if (!title || !date || !speaker || !host) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (
      typeof speaker !== 'object' ||
      !speaker.name ||
      !speaker.email
    ) {
      return res.status(400).json({ message: "Speaker name and email are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(speaker.email)) {
      return res.status(400).json({ message: "Invalid speaker email format" });
    }

    if (isNaN(Date.parse(date))) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const hostUser = await User.findById(host);
    if (!hostUser) {
      return res.status(404).json({ message: "Host user not found" });
    }

    if (hostUser.role !== 'host') {
      return res.status(403).json({ message: "User is not allowed to host webinars" });
    }

    const webinar = new Webinar({
      title,
      description,
      date,
      speaker,
      host
    });

    await webinar.save();

    res.status(201).json({
      message: "Created Successfully",
      webinar
    });
  } catch (error) {
    console.error("Webinar creation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
