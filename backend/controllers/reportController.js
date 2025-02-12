const Report = require('../models/reportModel');  
const User = require('../models/userModel'); 

exports.createReport = async (req, res) => {
    const { feedbackStats, departmentWiseStats } = req.body;

const admin = await User.findById(req.body.generatedBy);
    if (!admin || admin.role !== 'admin') {
        return res.status(403).json({ message: 'Only admin can generate reports' });
}

try {
    const report = new Report({
        generatedBy: req.body.generatedBy,
        feedbackStats,
        departmentWiseStats
    });
        await report.save();
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find().populate('generatedBy', 'name email');
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
