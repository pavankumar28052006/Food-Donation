import { validationResult } from 'express-validator';
import Donation from '../models/Donation.js';

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Private
export const createDonation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { foodType, quantity, pickupLocation, contact } = req.body;

    const donation = await Donation.create({
      foodType,
      quantity: Number(quantity),
      pickupLocation,
      contact,
      user: req.user.id
    });

    const populatedDonation = await Donation.findById(donation._id).populate('user', 'name email');

    res.status(201).json({
      message: 'Donation created successfully',
      donation: populatedDonation
    });
  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({ error: 'Server error while creating donation' });
  }
};

// @desc    Get all donations
// @route   GET /api/donations
// @access  Public
export const getAllDonations = async (req, res) => {
  try {
    const { status = 'available', limit = 50, page = 1 } = req.query;
    
    const query = { status };
    const skip = (Number(page) - 1) * Number(limit);

    const donations = await Donation.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await Donation.countDocuments(query);

    res.json({
      donations,
      pagination: {
        current: Number(page),
        total: Math.ceil(total / Number(limit)),
        hasNext: skip + donations.length < total,
        hasPrev: Number(page) > 1
      }
    });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ error: 'Server error while fetching donations' });
  }
};

// @desc    Get donation by ID
// @route   GET /api/donations/:id
// @access  Public
export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate('user', 'name email');
    
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json(donation);
  } catch (error) {
    console.error('Get donation by ID error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.status(500).json({ error: 'Server error while fetching donation' });
  }
};

// @desc    Update donation
// @route   PUT /api/donations/:id
// @access  Private
export const updateDonation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        errors: errors.array() 
      });
    }

    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    // Check if user owns the donation
    if (donation.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized to update this donation' });
    }

    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    res.json({
      message: 'Donation updated successfully',
      donation: updatedDonation
    });
  } catch (error) {
    console.error('Update donation error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.status(500).json({ error: 'Server error while updating donation' });
  }
};

// @desc    Delete donation
// @route   DELETE /api/donations/:id
// @access  Private
export const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    // Check if user owns the donation
    if (donation.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized to delete this donation' });
    }

    await donation.deleteOne();

    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Delete donation error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.status(500).json({ error: 'Server error while deleting donation' });
  }
};

// @desc    Get user's donations
// @route   GET /api/donations/my
// @access  Private
export const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user.id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    console.error('Get my donations error:', error);
    res.status(500).json({ error: 'Server error while fetching your donations' });
  }
}; 