import mongoose from 'mongoose';

const trialBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  goal: String,
  preferredDate: Date,
  status: { type: String, enum: ['pending', 'contacted', 'converted', 'cancelled'], default: 'pending' },
  gymId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' }
}, { timestamps: true });

const TrialBooking = mongoose.model('TrialBooking', trialBookingSchema);
export default TrialBooking;
