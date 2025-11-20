const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');

// Validation middleware
const taskValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid priority'),
];

router.route('/').get(protect, getTasks).post(protect, taskValidation, createTask);

router
  .route('/:id')
  .get(protect, getTask)
  .put(protect, taskValidation, updateTask)
  .delete(protect, deleteTask);

module.exports = router;