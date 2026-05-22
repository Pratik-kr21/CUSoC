const mongoose = require('mongoose');

const contributorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  university: { type: String, required: true },
  degreeProgram: { type: String, required: true },
  currentYear: { type: String, required: true },
  linkedIn: { type: String },
  gitHub: { type: String, required: true },
  resumeUrl: { type: String, required: true },
  
  areasOfInterest: [{ type: String, required: true }],
  technicalSkills: { type: String, required: true },
  comfortableWith: [{ type: String }],
  technicalConfidence: { type: Number, required: true, min: 1, max: 5 },
  
  bestProject: { type: String, required: true },
  projectLinks: { type: String },
  openSourceContributions: { type: String },
  workedInTeams: { type: Boolean, required: true },
  
  whyCUSoC: { type: String, required: true },
  whatAchieve: { type: String, required: true },
  whySelected: { type: String, required: true },
  selfLearnedSkill: { type: String },
  participatedIn: [{ type: String }],
  weeklyAvailability: { type: String, required: true },
  
  commitToPilot: { type: Boolean, default: false },
  otherCommitments: { type: String },
  
  preferredDomains: [{ type: String, required: true }],
  preferredRole: [{ type: String, required: true }],
  collabMode: { type: String, required: true },
  
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Contributor', contributorSchema);
