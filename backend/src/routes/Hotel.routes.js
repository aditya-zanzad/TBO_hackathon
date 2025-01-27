import express from 'express';
import { searchHotel, preBookHotel, bookHotel } from '../controllers/server/Hotelcontroller.js';

const router = express.Router();

router.post('/search', searchHotel);
router.post('/prebook', preBookHotel);
router.post('/book', bookHotel);

export default router;
