import express from 'express';
import {
  generateFaceSwap,
  generateAvatar,
  generateDuoPortrait,
  generatePoster,
  generateARPoster,
  ageTransform,
  enhanceImage,
  getHistory
} from '../controllers/aiController.js';
import { optional } from '../middleware/auth.js';
import { mockUser } from '../middleware/testUser.js';

const router = express.Router();

// Use optional auth + mock user for development/testing
const devAuth = [optional, mockUser];

router.post('/face-swap', devAuth, generateFaceSwap);
router.post('/avatar', devAuth, generateAvatar);
router.post('/duo-portrait', devAuth, generateDuoPortrait);
router.post('/poster', devAuth, generatePoster);
router.post('/ar-poster', devAuth, generateARPoster);
router.post('/age-transform', devAuth, ageTransform);
router.post('/enhance', devAuth, enhanceImage);
router.get('/history', devAuth, getHistory);

export default router;
