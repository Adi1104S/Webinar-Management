import express from "express";
import Webinar from "../models/webinar.js";
import User from "../models/user.js";

const router = express.Router();
// creating webinar
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
//  deleting the webinar
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { host } = req.body;

    const webinar = await Webinar.findById(id);
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    if (webinar.host.toString() !== host) {
      return res.status(403).json({ message: "Not authorized to delete this webinar" });
    }

    await webinar.deleteOne();

    res.status(200).json({ message: "Webinar deleted successfully" });

  } catch (error) {
    console.error("Webinar deletion error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// updating the webinar details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, speaker, host } = req.body;

    const webinar = await Webinar.findById(id);
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    if (webinar.host.toString() !== host) {
      return res.status(403).json({ message: "Not authorized to update this webinar" });
    }

    if (title) webinar.title = title;
    if (description) webinar.description = description;
    if (date) {
      if (isNaN(Date.parse(date))) {
        return res.status(400).json({ message: "Invalid date format" });
      }
      webinar.date = date;
    }
    if (speaker) {
      if (typeof speaker !== 'object' || !speaker.name || !speaker.email) {
        return res.status(400).json({ message: "Invalid speaker format" });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(speaker.email)) {
        return res.status(400).json({ message: "Invalid speaker email format" });
      }
      webinar.speaker = speaker;
    }

    await webinar.save();
    res.status(200).json({ message: "Webinar updated successfully", webinar });

  } catch (error) {
    console.error("Webinar update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// registering user to particular webinar
router.post('/:id/register', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const webinar = await Webinar.findById(id);
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== 'user') {
      return res.status(403).json({ message: "Only regular users can register for webinars" });
    }

    if (webinar.attendees.includes(userId)) {
      return res.status(400).json({ message: "User already registered for this webinar" });
    }

    webinar.attendees.push(userId);
    await webinar.save();

    res.status(200).json({ message: "Registration successful", webinar });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// fetching webinar by userid
router.get('/attendee/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const webinars = await Webinar.find({ attendees: userId }).populate('host', 'name email');

    res.status(200).json({ webinars });
  } catch (error) {
    console.error("Fetch attendee webinars error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// fetching webinar by hostid
router.get('/host/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const webinars = await Webinar.find({ host: userId }).populate('host', 'name email');

    res.status(200).json({ webinars });
  } catch (error) {
    console.error("Fetch host webinars error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
