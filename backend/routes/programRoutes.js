import express from 'express';
import { getAll, create, update, remove } from '../controllers/programController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getAll)
  .post(protect, create);

router.route('/:id')
  .put(protect, update)
  .delete(protect, remove);

export default router;
