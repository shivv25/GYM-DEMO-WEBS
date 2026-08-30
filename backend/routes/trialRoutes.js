import express from 'express';
import rateLimit from 'express-rate-limit';
import { getAll, create, updateStatus } from '../controllers/trialController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const trialLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { success: false, message: 'Too many trial requests, please try again later' }
});

router.route('/')
  .get(protect, getAll)
  .post(trialLimiter, create);

router.route('/:id')
  .put(protect, updateStatus);

export default router;
