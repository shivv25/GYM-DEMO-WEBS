import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  icon: String,
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'] },
  duration: String,
  image: String,
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  gymId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' }
}, { timestamps: true });

const Program = mongoose.model('Program', programSchema);
export default Program;
