import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    webinar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Webinar',
      required: true
    },

    status: {
      type: String,
      enum: ['registered', 'attended', 'cancelled'],
      default: 'registered'
    },

    registeredAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;
