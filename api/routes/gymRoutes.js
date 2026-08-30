import express from 'express';
import { getGym, updateGym } from '../controllers/gymController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getGym)
  .put(protect, updateGym);

export default router;
