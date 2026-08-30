import Membership from '../models/Membership.js';

export const getAll = async (req, res, next) => {
  try {
    const memberships = await Membership.find().sort({ order: 1 });
    res.json({ success: true, data: memberships });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const membership = await Membership.create(req.body);
    res.status(201).json({ success: true, data: membership, message: 'Membership created successfully' });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const membership = await Membership.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!membership) {
      res.status(404);
      throw new Error('Membership not found');
    }
    res.json({ success: true, data: membership, message: 'Membership updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const membership = await Membership.findByIdAndDelete(req.params.id);
    if (!membership) {
      res.status(404);
      throw new Error('Membership not found');
    }
    res.json({ success: true, message: 'Membership deleted successfully' });
  } catch (error) {
    next(error);
  }
};
