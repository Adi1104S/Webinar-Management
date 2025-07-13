import express from 'express';
import Feedback from '../models/feedback.js';
import Webinar from '../models/webinar.js';
import User from '../models/user.js';

const router = express.Router();

// Get all feedbacks by a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const feedbacks = await Feedback.find({ user: userId }).populate('webinar', 'title dateTime');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user feedbacks', error: err.message });
  }
});

// Get all feedbacks for a specific webinar
router.get('/webinar/:webinarId', async (req, res) => {
  try {
    const { webinarId } = req.params;

    const webinar = await Webinar.findById(webinarId);
    if (!webinar) return res.status(404).json({ message: 'Webinar not found' });

    const feedbacks = await Feedback.find({ webinar: webinarId }).populate('user', 'name email');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching webinar feedbacks', error: err.message });
  }
});

// Add feedback by user and webinar ID
router.post('/:userId/:webinarId', async (req, res) => {
  try {
    const { userId, webinarId } = req.params;
    const { rating, comment } = req.body;

    const user = await User.findById(userId);
    const webinar = await Webinar.findById(webinarId);

    if (!user || !webinar) {
      return res.status(404).json({ message: 'User or Webinar not found' });
    }

    const existing = await Feedback.findOne({ user: userId, webinar: webinarId });
    if (existing) {
      return res.status(400).json({ message: 'Feedback already submitted by this user.' });
    }

    const feedback = new Feedback({
      user: userId,
      webinar: webinarId,
      rating,
      comment
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (err) {
    res.status(500).json({ message: 'Error adding feedback', error: err.message });
  }
});

// Delete feedback by user and webinar ID
router.delete('/:userId/:webinarId', async (req, res) => {
  try {
    const { userId, webinarId } = req.params;

    const user = await User.findById(userId);
    const webinar = await Webinar.findById(webinarId);

    if (!user || !webinar) {
      return res.status(404).json({ message: 'User or Webinar not found' });
    }

    const deleted = await Feedback.findOneAndDelete({ user: userId, webinar: webinarId });

    if (!deleted) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting feedback', error: err.message });
  }
});

export default router;
