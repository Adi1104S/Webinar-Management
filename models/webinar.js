import mongoose from 'mongoose';

const webinarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    date: {
      type: Date,
      required: true
    },

    speaker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (speaker)
      required: true
    },

    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Users who joined/registered
      }
    ],

    feedbacks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback' // Optional reference to feedback documents
      }
    ]
  },
  { timestamps: true }
);

const Webinar = mongoose.model('Webinar', webinarSchema);
export default Webinar;
