import Gym from '../models/Gym.js';

export const getGym = async (req, res, next) => {
  try {
    const gym = await Gym.findOne();
    if (!gym) {
      res.status(404);
      throw new Error('Gym config not found');
    }
    res.json({ success: true, data: gym });
  } catch (error) {
    next(error);
  }
};

export const updateGym = async (req, res, next) => {
  try {
    const gym = await Gym.findOneAndUpdate({}, req.body, { new: true, runValidators: true });
    if (!gym) {
      res.status(404);
      throw new Error('Gym config not found');
    }
    res.json({ success: true, data: gym, message: 'Gym config updated successfully' });
  } catch (error) {
    next(error);
  }
};
