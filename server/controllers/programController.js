import Program from '../models/Program.js';

export const getAll = async (req, res, next) => {
  try {
    const programs = await Program.find().sort({ order: 1 });
    res.json({ success: true, data: programs });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const program = await Program.create(req.body);
    res.status(201).json({ success: true, data: program, message: 'Program created successfully' });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!program) {
      res.status(404);
      throw new Error('Program not found');
    }
    res.json({ success: true, data: program, message: 'Program updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      res.status(404);
      throw new Error('Program not found');
    }
    res.json({ success: true, message: 'Program deleted successfully' });
  } catch (error) {
    next(error);
  }
};
