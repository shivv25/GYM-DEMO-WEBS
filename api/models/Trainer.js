import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: String,
  experience: String,
  specialization: [String],
  bio: String,
  image: String,
  social: { instagram: String, twitter: String },
  order: Number,
  isActive: Boolean,
  gymId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' }
}, { timestamps: true });

const Trainer = mongoose.model('Trainer', trainerSchema);
export default Trainer;
