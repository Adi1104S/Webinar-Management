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
      name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        trim: true
      },
      bio: {
        type: String,
        trim: true
      }
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    feedbacks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
      }
    ]
  },
  { timestamps: true }
);

const Webinar = mongoose.model('Webinar', webinarSchema);
export default Webinar;
