const mongoose = require('mongoose');

const projectProposalSchema = new mongoose.Schema({
  // --- Submitter Info ---
  proposerName:     { type: String, required: true },
  email:            { type: String, required: true },
  contactNumber:    { type: String },
  linkedIn:         { type: String },
  affiliation:      { type: String, required: true, enum: ['Faculty', 'Industry', 'Student'] },

  // --- Faculty-specific (Institutional) ---
  designation:      { type: String },
  department:       { type: String },
  employeeId:       { type: String },

  // --- Industry-specific ---
  companyName:      { type: String },
  companyWebsite:   { type: String },
  companySize:      { type: String },

  // --- Section 2: Project Overview ---
  projectTitle:     { type: String, required: true },
  projectDomain:    [{ type: String }],
  projectType:      { type: String },
  difficultyLevel:  { type: String },
  projectAbstract:  { type: String },

  // --- Section 3: Problem Statement & Scope ---
  problemStatement: { type: String, required: true },
  proposedSolution: { type: String, required: true },
  expectedDeliverables: { type: String, required: true },
  currentStatus:    { type: String, enum: ['Idea Stage', 'Planning', 'In Progress', 'Existing Codebase'], default: 'Idea Stage' },
  estimatedDuration: { type: String, default: '8 weeks' },

  // --- Section 4: Technical Requirements ---
  requiredSkills:   [{ type: String }],
  techStack:        { type: String },        // preferred technologies / tools
  preferredLevel:   [{ type: String }],      // contributor year levels
  preferredRoles:   [{ type: String }],

  // --- Section 5: Mentorship & Support ---
  mentorAvailability: { type: String },
  collaborationMode:  { type: String },
  resourcesAvailable: [{ type: String }],
  repoLink:           { type: String },
  gitHub:             { type: String },      // kept for backwards compat
  willingToMentor:    { type: Boolean, default: true },

  // --- Section 6: Outcomes & Impact ---
  expectedOutcomes:   [{ type: String }],
  learningOutcomes:   { type: String },
  successEvaluation:  { type: String },

  // --- Section 7: Compliance (Institutional only) ---
  sensitiveData:    { type: String, enum: ['Yes', 'No'], default: 'No' },

  // --- Admin-managed status ---
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('ProjectProposal', projectProposalSchema);
