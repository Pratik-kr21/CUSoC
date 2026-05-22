const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Contributor = require('../models/Contributor');
const Mentor = require('../models/Mentor');
const ProjectProposal = require('../models/ProjectProposal');
const sendEmail = require('../utils/sendEmail');

// @desc    Admin login
// @route   POST /api/admin/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@cusoc.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign({ id: 'admin' }, process.env.JWT_SECRET || 'secret123', { expiresIn: '30d' });
      return res.json({ token, email });
    }

    res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all submissions
// @route   GET /api/admin/submissions
// @access  Private (Needs middleware)
const getSubmissions = async (req, res) => {
  try {
    const contributors = await Contributor.find().sort({ createdAt: -1 });
    const mentors = await Mentor.find().sort({ createdAt: -1 });
    const projects = await ProjectProposal.find().sort({ createdAt: -1 });
    
    res.json({ contributors, mentors, projects });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update submission status
// @route   PUT /api/admin/submissions/:type/:id
const updateStatus = async (req, res) => {
  try {
    const { type, id } = req.params;
    const { status } = req.body; // 'Approved' or 'Rejected'

    let result;
    if (type === 'contributor') {
      result = await Contributor.findByIdAndUpdate(id, { status }, { new: true });
    } else if (type === 'mentor') {
      result = await Mentor.findByIdAndUpdate(id, { status }, { new: true });
    } else if (type === 'project') {
      result = await ProjectProposal.findByIdAndUpdate(id, { status }, { new: true });
    } else {
      return res.status(400).json({ message: 'Invalid type' });
    }

    if (!result) return res.status(404).json({ message: 'Not found' });

    // Send Status Update Email
    const emailTo = result.email || (result.proposerEmail ? result.proposerEmail : null); // Adjust if model uses different email key
    if (emailTo && (status === 'Approved' || status === 'Rejected')) {
      const emailHtml = `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Application Update</h2>
          <p>Hi ${result.fullName || result.proposerName || 'Applicant'},</p>
          <p>Your ${type} application status has been updated to: <strong style="color: ${status === 'Approved' ? 'green' : 'red'}">${status}</strong>.</p>
          ${status === 'Approved' 
            ? '<p>Congratulations! You are now part of the CUSoC program. We will be in touch with next steps soon.</p>' 
            : '<p>Unfortunately, we cannot proceed with your application at this time. Thank you for your interest.</p>'}
          <br/>
          <p>Best regards,<br/><strong>CUSoC Team</strong></p>
        </div>
      `;
      await sendEmail({ email: emailTo, subject: `CUSoC Application ${status}`, html: emailHtml });
    }

    res.json({ message: 'Status updated', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login, getSubmissions, updateStatus };
