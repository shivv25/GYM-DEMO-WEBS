import Trainer from '../models/Trainer.js';

export const getAll = async (req, res, next) => {
  try {
    const trainers = await Trainer.find().sort({ order: 1 });
    res.json({ success: true, data: trainers });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const trainer = await Trainer.create(req.body);
    res.status(201).json({ success: true, data: trainer, message: 'Trainer created successfully' });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!trainer) {
      res.status(404);
      throw new Error('Trainer not found');
    }
    res.json({ success: true, data: trainer, message: 'Trainer updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) {
      res.status(404);
      throw new Error('Trainer not found');
    }
    res.json({ success: true, message: 'Trainer deleted successfully' });
  } catch (error) {
    next(error);
  }
};
