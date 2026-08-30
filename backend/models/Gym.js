import mongoose from 'mongoose';

const gymSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: String,
  description: String,
  logo: String,
  branding: {
    primaryColor: String,
    secondaryColor: String,
    backgroundColor: String,
    textColor: String,
    mutedColor: String
  },
  hero: {
    badge: String,
    heading: [String],
    accentLine: String,
    subheading: String,
    primaryCTA: { text: String, link: String },
    secondaryCTA: { text: String, link: String },
    image: String,
    reviewBadge: { rating: Number, text: String }
  },
  contact: {
    phone: String,
    email: String,
    address: String,
    mapEmbed: String
  },
  social: { instagram: String, facebook: String, youtube: String, twitter: String },
  hours: [{ days: String, time: String }],
  stats: [{ value: String, suffix: String, label: String }],
  about: { shortDescription: String, mission: String, values: [String] },
  announcement: { enabled: Boolean, text: String, link: String, linkText: String },
  whyChooseUs: { heading: String, subheading: String, features: [{ icon: String, title: String, description: String }] },
  transformation: { heading: String, subheading: String, stats: [{ value: String, label: String }], quote: String, author: String, authorRole: String, image: String },
  finalCTA: { heading: String, subheading: String, buttonText: String, buttonLink: String },
  footer: { description: String, quickLinks: [{ text: String, href: String }], legalLinks: [{ text: String, href: String }], copyright: String },
  socialProof: { heading: String, brands: [String] }
}, { timestamps: true });

const Gym = mongoose.model('Gym', gymSchema);
export default Gym;
