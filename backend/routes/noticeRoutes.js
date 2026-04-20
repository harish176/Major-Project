import express from 'express';
import { getAllNotices } from '../controllers/noticeController.js';

const router = express.Router();

router.get('/', getAllNotices);

export default router;