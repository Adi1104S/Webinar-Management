import express from "express";
import mongoose from "mongoose";
import Registration from "../models/registration.js";
import Webinar from "../models/webinar.js";
import User from "../models/user.js";

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, userID, webinarID } = req.body;

    let user;
    if (userID) {
      user = await User.findById(userID);
    } else if (email) {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found with provided email or userID' });
    }

    const webinar = await Webinar.findById(webinarID);
    if (!webinar) {
      return res.status(404).json({ message: 'Webinar not found' });
    }

    const existing = await Registration.findOne({
      user: user._id,
      webinar: webinarID
    });

    if (existing) {
      return res.status(400).json({ message: 'Already registered' });
    }

    const registration = await Registration.create({
      user: user._id,
      webinar: webinarID,
      status: 'registered'
    });

    res.status(201).json(registration);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const registrations = await Registration.find({ user: userId }).populate('webinar');
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['registered', 'attended', 'cancelled'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updated = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
