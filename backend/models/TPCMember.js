import mongoose from 'mongoose';

const tpcMemberSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    trim: true
  },
  
  contact_no: {
    type: String
  },

  // Professional Information
  department: {
    type: String,
    trim: true
  },

  team: {
    type: String,
    trim: true
  },

  role: {
    type: String,
    default: 'Member'
  },

  // Category to differentiate between faculty and students
  category: {
    type: String,
    lowercase: true
  },

  // Session/Academic Years
  session: [{
    type: String
  }],

  // Optional fields for additional information
  email: {
    type: String,
    trim: true,
    lowercase: true
  },

  // For students - additional academic info
  studentInfo: {
    rollNumber: {
      type: String,
      trim: true,
      uppercase: true
    },
    year: {
      type: Number
    },
    semester: {
      type: Number
    }
  },

  // For faculty - employee info
  facultyInfo: {
    employeeId: {
      type: String,
      trim: true,
      uppercase: true
    },
    designation: {
      type: String,
      trim: true
    }
  },

  // Status and Activity
  status: {
    type: String,
    default: 'active'
  },

  isActive: {
    type: Boolean,
    default: true
  },

  // Additional responsibilities or specializations
  responsibilities: [{
    type: String,
    trim: true
  }],

  // Photo/Profile picture
  photo: {
    url: {
      type: String,
      default: null
    },
    publicId: {
      type: String,
      default: null
    }
  },

  // Notes or additional information
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: { virtuals: true }
});

// Indexes for better performance
// Note: contact_no, email, rollNumber, and employeeId already have unique indexes from field definitions
tpcMemberSchema.index({ name: 1 });
tpcMemberSchema.index({ department: 1 });
tpcMemberSchema.index({ category: 1 });
tpcMemberSchema.index({ team: 1 });
tpcMemberSchema.index({ role: 1 });
tpcMemberSchema.index({ status: 1 });
tpcMemberSchema.index({ session: 1 });

// Virtual for full academic year display
tpcMemberSchema.virtual('sessionDisplay').get(function() {
  return this.session.join(', ');
});

// Virtual to get the current/latest session
tpcMemberSchema.virtual('currentSession').get(function() {
  if (!this.session || this.session.length === 0) return null;
  // Return the latest session (assuming sessions are in chronological order)
  return this.session[this.session.length - 1];
});

// Static method to find members by category
tpcMemberSchema.statics.findByCategory = function(category) {
  return this.find({ category, isActive: true });
};

// Static method to find members by team
tpcMemberSchema.statics.findByTeam = function(team) {
  return this.find({ team, isActive: true });
};

// Static method to find members by session
tpcMemberSchema.statics.findBySession = function(session) {
  return this.find({ session: session, isActive: true });
};

// Static method to get all active members with pagination
tpcMemberSchema.statics.getActiveMembers = function(page = 1, limit = 10, filters = {}) {
  const query = { isActive: true, ...filters };
  const skip = (page - 1) * limit;
  
  return this.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('department')
    .exec();
};

// Instance method to check if member is a student
tpcMemberSchema.methods.isStudent = function() {
  return ['b-tech', 'm-tech', 'mca', 'phd'].includes(this.category);
};

// Instance method to check if member is faculty
tpcMemberSchema.methods.isFaculty = function() {
  return this.category === 'faculty';
};

// Instance method to get display name with role
tpcMemberSchema.methods.getDisplayNameWithRole = function() {
  return `${this.name} (${this.role})`;
};



const TPCMember = mongoose.model('TPCMember', tpcMemberSchema);

export default TPCMember;