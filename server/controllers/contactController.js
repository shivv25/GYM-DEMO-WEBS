import ContactMessage from '../models/ContactMessage.js';

export const getAll = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const message = await ContactMessage.create(req.body);
    res.status(201).json({ success: true, data: message, message: 'Message sent successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!message) {
      res.status(404);
      throw new Error('Message not found');
    }
    res.json({ success: true, data: message, message: 'Message status updated successfully' });
  } catch (error) {
    next(error);
  }
};
