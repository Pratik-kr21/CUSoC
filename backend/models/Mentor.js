const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  mentorType: {
    type: String,
    enum: ['Industry', 'Faculty', 'Student'],
    required: true
  },
  // Common Fields
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  linkedIn: { type: String },
  gitHub: { type: String },
  resumeUrl: { type: String }, // Made optional for Faculty and Student
  areasOfExpertise: [{ type: String, required: true }],
  mentoringExperience: { type: String },
  mentorshipApproach: { type: String },
  whyMentor: { type: String }, // Optional/Removed in some forms, replaced by mentorshipGoals
  mentorshipGoals: { type: String },
  availableHours: { type: String, required: true },
  collabMode: { type: String, required: true },
  maxMentees: { type: Number },
  canProvide: [{ type: String }],
  
  // Industry specific
  currentCompany: { type: String },
  designation: { type: String },
  yearsOfExperience: { type: String },
  industriesFocus: [{ type: String }],
  
  // Faculty specific
  department: { type: String },
  employeeId: { type: String },
  officialEmail: { type: String },
  researchAreas: [{ type: String }],
  
  // Student specific
  rollNumber: { type: String },
  cuEmail: { type: String },
  currentYear: { type: String },
  skillAreas: [{ type: String }],
  
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Mentor', mentorSchema);
