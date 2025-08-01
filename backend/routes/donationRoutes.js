import express from 'express';
import { body } from 'express-validator';
import { 
  createDonation, 
  getAllDonations, 
  getDonationById, 
  updateDonation, 
  deleteDonation,
  getMyDonations 
} from '../controllers/donationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/donations
router.post('/', protect, [
  body('foodType')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Food type must be at least 2 characters long'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive number'),
  body('pickupLocation')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Pickup location must be at least 5 characters long'),
  body('contact')
    .matches(/^[0-9\-\+]{9,15}$/)
    .withMessage('Please provide a valid contact number (9-15 digits, numbers, +, - allowed)'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
], createDonation);

// @route   GET /api/donations
router.get('/', getAllDonations);

// @route   GET /api/donations/my
router.get('/my', protect, getMyDonations);

// @route   GET /api/donations/:id
router.get('/:id', getDonationById);

// @route   PUT /api/donations/:id
router.put('/:id', protect, [
  body('foodType')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Food type must be at least 2 characters long'),
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive number'),
  body('pickupLocation')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Pickup location must be at least 5 characters long'),
  body('contact')
    .optional()
    .matches(/^[0-9\-\+]{9,15}$/)
    .withMessage('Please provide a valid contact number (9-15 digits, numbers, +, - allowed)'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(['available', 'claimed', 'expired'])
    .withMessage('Status must be available, claimed, or expired')
], updateDonation);

// @route   DELETE /api/donations/:id
router.delete('/:id', protect, deleteDonation);

export default router; 