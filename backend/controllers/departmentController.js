const Department = require('../models/departmentModel');
const User = require('../models/userModel');

// Create a new department
const createDepartment = async (req, res) => {
    try {
        const { name, admins } = req.body;

        const existingDepartment = await Department.findOne({ name });
        if (existingDepartment) {
            return res.status(400).json({ error: 'Department already exists' });
        }

        const department = new Department({
            name,
            admins
    });

    await department.save();
    return res.status(201).json({ message: 'Department created successfully', department });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('admins', 'name email');
        return res.json(departments);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

// Get department by ID
const getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id).populate('admins', 'name email');
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }
        return res.json(department);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    };

// Update a department's admins
const updateAdmins = async (req, res) => {
    try {
        const { id } = req.params;
        const { admins } = req.body;

        const department = await Department.findByIdAndUpdate(
            id,
            { admins },
            { new: true, runValidators: true }
        ).populate('admins', 'name email');

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        return res.json({ message: 'Department updated successfully', department });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Something went wrong' });
    }
};

// Delete a department
const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findByIdAndDelete(id);

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        return res.json({ message: 'Department deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { createDepartment, getAllDepartments, getDepartmentById, updateAdmins, deleteDepartment };
