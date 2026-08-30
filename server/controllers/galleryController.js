import Gallery from '../models/Gallery.js';

export const getAll = async (req, res, next) => {
  try {
    const galleryItems = await Gallery.find().sort({ order: 1 });
    res.json({ success: true, data: galleryItems });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const galleryItem = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: galleryItem, message: 'Gallery item created successfully' });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const galleryItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!galleryItem) {
      res.status(404);
      throw new Error('Gallery item not found');
    }
    res.json({ success: true, data: galleryItem, message: 'Gallery item updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const galleryItem = await Gallery.findByIdAndDelete(req.params.id);
    if (!galleryItem) {
      res.status(404);
      throw new Error('Gallery item not found');
    }
    res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    next(error);
  }
};
