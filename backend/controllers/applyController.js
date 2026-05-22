const Contributor = require('../models/Contributor');
const Mentor = require('../models/Mentor');
const ProjectProposal = require('../models/ProjectProposal');
const sendEmail = require('../utils/sendEmail');

// In-memory store for OTPs
const otpStore = new Map();

// @desc    Send OTP for email verification
// @route   POST /api/apply/send-otp
// @access  Public
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.endsWith('@cumail.in')) {
      return res.status(400).json({ message: 'Valid @cumail.in email is required' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // 10 minutes

    const emailHtml = `
      <div style="font-family: sans-serif; color: #333;">
        <h2>Email Verification</h2>
        <p>Your OTP for CUSoC Faculty Mentor Registration is: <strong style="font-size: 24px;">${otp}</strong></p>
        <p>This OTP is valid for 10 minutes.</p>
        <br/>
        <p>Best regards,<br/><strong>CUSoC Team</strong></p>
      </div>
    `;
    await sendEmail({ email, subject: 'CUSoC - Verification OTP', html: emailHtml });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// @desc    Verify OTP
// @route   POST /api/apply/verify-otp
// @access  Public
const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const storedData = otpStore.get(email);

  if (!storedData) {
    return res.status(400).json({ message: 'OTP not found or expired. Please request a new one.' });
  }

  if (Date.now() > storedData.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
  }

  if (storedData.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP.' });
  }

  otpStore.delete(email);
  res.status(200).json({ message: 'Email verified successfully.' });
};

// @desc    Submit a contributor application
// @route   POST /api/apply/contributor (multipart/form-data with resume)
// @access  Public
const submitContributor = async (req, res) => {
  try {
    const {
      fullName, email, contactNumber, university, degreeProgram, currentYear,
      linkedIn, gitHub, areasOfInterest, technicalSkills, comfortableWith,
      technicalConfidence, bestProject, projectLinks, openSourceContributions,
      workedInTeams, whyCUSoC, whatAchieve, whySelected, selfLearnedSkill,
      weeklyAvailability, commitToPilot, otherCommitments, preferredDomains,
      preferredRole, collabMode, participatedIn
    } = req.body;

    const resumeUrl = req.file ? req.file.path : null;

    if (!resumeUrl) {
      return res.status(400).json({ message: 'Resume is required' });
    }

    const newContributor = new Contributor({
      fullName, email, contactNumber, university, degreeProgram, currentYear,
      linkedIn, gitHub,
      areasOfInterest: JSON.parse(areasOfInterest || '[]'),
      technicalSkills,
      comfortableWith: JSON.parse(comfortableWith || '[]'),
      technicalConfidence,
      bestProject, projectLinks, openSourceContributions,
      workedInTeams: workedInTeams === 'Yes' || workedInTeams === true,
      whyCUSoC, whatAchieve, whySelected, selfLearnedSkill,
      participatedIn: JSON.parse(participatedIn || '[]'),
      weeklyAvailability,
      commitToPilot: commitToPilot === 'true' || commitToPilot === true,
      otherCommitments,
      preferredDomains: JSON.parse(preferredDomains || '[]'),
      preferredRole: JSON.parse(preferredRole || '[]'),
      collabMode,
      resumeUrl
    });

    await newContributor.save();

    const emailHtml = `
      <div style="font-family: sans-serif; color: #333;">
        <h2>Application Received!</h2>
        <p>Hi ${fullName},</p>
        <p>Thank you for applying to be a Contributor for the Chandigarh University Summer of Code (CUSoC) pilot program.</p>
        <p>We have successfully received your application. Our team will review your details and get back to you soon regarding the next steps.</p>
        <br/>
        <p>Best regards,<br/><strong>CUSoC Team</strong></p>
      </div>
    `;
    await sendEmail({ email, subject: 'CUSoC Contributor Application Received', html: emailHtml });

    res.status(201).json({ message: 'Contributor application submitted successfully' });
  } catch (error) {
    console.error('Error submitting contributor:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Submit a mentor application
// @route   POST /api/apply/mentor (multipart/form-data with resume)
// @access  Public
const submitMentor = async (req, res) => {
  try {
    const {
      mentorType, fullName, email, contactNumber, linkedIn, gitHub,
      areasOfExpertise, mentoringExperience, whyMentor, mentorshipGoals,
      mentorshipApproach, availableHours, collabMode, maxMentees, canProvide,
      // Industry mentor specific
      currentCompany, designation, yearsOfExperience, industriesFocus,
      // Faculty mentor specific
      department, employeeId, officialEmail, researchAreas,
      // Student mentor specific
      rollNumber, cuEmail, currentYear, skillAreas,
      // mentorshipStyle is an alias for mentorshipApproach
      mentorshipStyle
    } = req.body;

    const resumeUrl = req.file ? req.file.path : null;

    if (mentorType === 'Industry' && !resumeUrl) {
      return res.status(400).json({ message: 'Resume is required for Industry mentors.' });
    }

    const newMentor = new Mentor({
      mentorType, fullName, email, contactNumber, linkedIn, gitHub,
      areasOfExpertise: JSON.parse(areasOfExpertise || '[]'),
      mentoringExperience,
      whyMentor,
      mentorshipGoals,
      mentorshipApproach: mentorshipApproach || mentorshipStyle,
      availableHours,
      collabMode,
      maxMentees: maxMentees ? Number(maxMentees) : undefined,
      canProvide: JSON.parse(canProvide || '[]'),
      resumeUrl,

      // Industry
      currentCompany, designation, yearsOfExperience,
      industriesFocus: JSON.parse(industriesFocus || '[]'),

      // Faculty
      department, employeeId, officialEmail,
      researchAreas: JSON.parse(researchAreas || '[]'),

      // Student
      rollNumber, cuEmail, currentYear,
      skillAreas: JSON.parse(skillAreas || '[]')
    });

    await newMentor.save();

    const emailHtml = `
      <div style="font-family: sans-serif; color: #333;">
        <h2>Mentor Application Received!</h2>
        <p>Hi ${fullName},</p>
        <p>Thank you for applying as a <strong>${mentorType} Mentor</strong> for CUSoC.</p>
        <p>We're thrilled by your interest in guiding our student developers. Our organizing team will review your profile and reach out to you shortly.</p>
        <br/>
        <p>Best regards,<br/><strong>CUSoC Team</strong></p>
      </div>
    `;
    await sendEmail({ email, subject: 'CUSoC Mentor Application Received', html: emailHtml });

    res.status(201).json({ message: 'Mentor application submitted successfully' });
  } catch (error) {
    console.error('Error submitting mentor:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Submit a project proposal (Institutional or Industry)
// @route   POST /api/apply/project (application/json)
// @access  Public
const submitProject = async (req, res) => {
  try {
    const {
      // Section 1 — Contact Info
      proposerName, email, contactNumber, linkedIn,
      affiliation,
      // Faculty-specific
      designation, department, employeeId,
      // Industry-specific
      companyName, companyWebsite, companySize,

      // Section 2 — Project Overview
      projectTitle, projectDomain, projectType, difficultyLevel, projectAbstract,

      // Section 3 — Problem Statement & Scope
      problemStatement, proposedSolution, expectedDeliverables,
      currentStatus, estimatedDuration,

      // Section 4 — Technical Requirements
      requiredSkills, techStack, preferredLevel, preferredRoles,

      // Section 5 — Mentorship & Support
      mentorAvailability, collaborationMode, resourcesAvailable,
      repoLink, gitHub, willingToMentor,

      // Section 6 — Outcomes & Impact
      expectedOutcomes, learningOutcomes, successEvaluation,

      // Section 7 — Compliance (Institutional)
      sensitiveData
    } = req.body;

    const newProject = new ProjectProposal({
      // Contact
      proposerName, email, contactNumber, linkedIn,
      affiliation,
      designation, department, employeeId,
      companyName, companyWebsite, companySize,

      // Project Overview
      projectTitle,
      projectDomain: Array.isArray(projectDomain) ? projectDomain : [],
      projectType,
      difficultyLevel,
      projectAbstract,

      // Scope
      problemStatement, proposedSolution, expectedDeliverables,
      currentStatus, estimatedDuration: estimatedDuration || '8 weeks',

      // Technical
      requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [],
      techStack,
      preferredLevel: Array.isArray(preferredLevel) ? preferredLevel : [],
      preferredRoles: Array.isArray(preferredRoles) ? preferredRoles : [],

      // Mentorship
      mentorAvailability, collaborationMode,
      resourcesAvailable: Array.isArray(resourcesAvailable) ? resourcesAvailable : [],
      repoLink: repoLink || gitHub,
      gitHub: gitHub || repoLink,
      willingToMentor: willingToMentor !== false,

      // Outcomes
      expectedOutcomes: Array.isArray(expectedOutcomes) ? expectedOutcomes : [],
      learningOutcomes, successEvaluation,

      // Compliance
      sensitiveData: sensitiveData || 'No'
    });

    await newProject.save();

    const emailHtml = `
      <div style="font-family: sans-serif; color: #333;">
        <h2>Project Proposal Received!</h2>
        <p>Hi ${proposerName},</p>
        <p>Thank you for proposing the project <strong>"${projectTitle}"</strong> for CUSoC.</p>
        <p>Our program administrators will review your proposal to ensure it aligns with our cohort goals. We will notify you once it's approved.</p>
        <br/>
        <p>Best regards,<br/><strong>CUSoC Team</strong></p>
      </div>
    `;
    await sendEmail({ email, subject: 'CUSoC Project Proposal Received', html: emailHtml });

    res.status(201).json({ message: 'Project proposal submitted successfully' });
  } catch (error) {
    console.error('Error submitting project proposal:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  submitContributor,
  submitMentor,
  submitProject
};
