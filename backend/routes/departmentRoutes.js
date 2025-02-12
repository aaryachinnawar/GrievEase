const express = require('express');
const router = express.Router();
const { createDepartment, getAllDepartments, getDepartmentById, updateAdmins, deleteDepartment } = require('../controllers/departmentController');

// Create a new department
router.post('/create', createDepartment);

// Get all departments
router.get('/', getAllDepartments);

// Get a department by ID
router.get('/:id', getDepartmentById);

// Update department admins
router.put('/:id/admins', updateAdmins);

// Delete a department
router.delete('/:id', deleteDepartment);

module.exports = router;
