import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: '₹' },
  period: { type: String, default: 'month' },
  description: String,
  features: [{ text: String, included: Boolean }],
  isPopular: { type: Boolean, default: false },
  cta: String,
  order: Number,
  isActive: Boolean,
  gymId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' }
}, { timestamps: true });

const Membership = mongoose.model('Membership', membershipSchema);
export default Membership;
