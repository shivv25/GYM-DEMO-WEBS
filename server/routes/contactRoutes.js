import express from 'express';
import rateLimit from 'express-rate-limit';
import { getAll, create, updateStatus } from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many messages sent, please try again later' }
});

router.route('/')
  .get(protect, getAll)
  .post(contactLimiter, create);

router.route('/:id')
  .put(protect, updateStatus);

export default router;
