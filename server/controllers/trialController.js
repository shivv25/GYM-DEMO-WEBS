import TrialBooking from '../models/TrialBooking.js';

export const getAll = async (req, res, next) => {
  try {
    const trials = await TrialBooking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: trials });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const trial = await TrialBooking.create(req.body);
    res.status(201).json({ success: true, data: trial, message: 'Trial booking created successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const trial = await TrialBooking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!trial) {
      res.status(404);
      throw new Error('Trial booking not found');
    }
    res.json({ success: true, data: trial, message: 'Trial status updated successfully' });
  } catch (error) {
    next(error);
  }
};
