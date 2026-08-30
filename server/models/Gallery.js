import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  image: { type: String, required: true },
  caption: String,
  category: String,
  order: Number,
  isActive: Boolean,
  gymId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' }
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
