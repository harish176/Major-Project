import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const studentSchema = new mongoose.Schema({
  // Basic Information
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    maxlength: [100, 'Student name cannot exceed 100 characters']
  },
  scholarNumber: {
    type: String,
    required: false, // Made optional to handle existing users
    unique: true,
    sparse: true, // Allows multiple null values for unique constraint
    trim: true,
    maxlength: [20, 'Scholar number cannot exceed 20 characters']
  },
  studentPhone: {
    type: String,
    required: [true, 'Student phone is required'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: 'Please provide a valid 10-digit phone number'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please provide a valid email address'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  studentPhotoUrl: {
    type: String,
    default: null
  },
  studentPhotoPublicId: {
    type: String,
    default: null
  },

  // Family Information
  fatherName: {
    type: String,
    trim: true,
    maxlength: [100, 'Father name cannot exceed 100 characters']
  },
  fatherPhone: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^\d{10}$/.test(v);
      },
      message: 'Please provide a valid 10-digit father phone number'
    }
  },
  motherName: {
    type: String,
    trim: true,
    maxlength: [100, 'Mother name cannot exceed 100 characters']
  },
  fatherOccupation: {
    type: String,
    trim: true,
    maxlength: [100, 'Father occupation cannot exceed 100 characters']
  },
  motherOccupation: {
    type: String,
    trim: true,
    maxlength: [100, 'Mother occupation cannot exceed 100 characters']
  },

  // Category and Financial Information
  category: {
    type: String,
    enum: ['General', 'OBC', 'SC', 'ST', 'EWS'],
    trim: true
  },
  income: {
    type: Number,
    min: [0, 'Income cannot be negative']
  },

  // Academic Information
  jeeMainRank: {
    type: Number,
    min: [1, 'JEE Main rank must be positive']
  },
  jeeAdvancedRank: {
    type: Number,
    min: [1, 'JEE Advanced rank must be positive']
  },
  branch: {
    type: String,
    trim: true,
    maxlength: [100, 'Branch name cannot exceed 100 characters']
  },
  degree: {
    type: String,
    enum: ['B.Tech', 'M.Tech', 'PhD', 'MBA', 'MCA'],
    trim: true
  },
  dateOfJoining: {
    type: Date
  },

  // Address Information
  state: {
    type: String,
    trim: true,
    maxlength: [50, 'State name cannot exceed 50 characters']
  },
  city: {
    type: String,
    trim: true,
    maxlength: [50, 'City name cannot exceed 50 characters']
  },
  pincode: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^\d{6}$/.test(v);
      },
      message: 'Please provide a valid 6-digit pincode'
    }
  },

  // Personal Information
  nationality: {
    type: String,
    trim: true,
    maxlength: [50, 'Nationality cannot exceed 50 characters']
  },
  motherTongue: {
    type: String,
    trim: true,
    maxlength: [50, 'Mother tongue cannot exceed 50 characters']
  },
  aadharNumber: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple null values
    validate: {
      validator: function(v) {
        return !v || /^\d{12}$/.test(v);
      },
      message: 'Please provide a valid 12-digit Aadhar number'
    }
  },

  // System fields
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  toJSON: { 
    transform: function(doc, ret) {
      delete ret.password; // Don't include password in JSON responses
      return ret;
    }
  }
});

// Additional indexes for better performance (unique fields already have indexes)
studentSchema.index({ scholarNumber: 1 });
studentSchema.index({ status: 1 });
studentSchema.index({ createdAt: -1 });

// Hash password before saving
studentSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
studentSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method to find student by email or phone
studentSchema.statics.findByEmailOrPhone = function(email, phone) {
  return this.findOne({
    $or: [{ email }, { studentPhone: phone }]
  });
};

// Virtual for full name (if needed)
studentSchema.virtual('fullName').get(function() {
  return this.studentName;
});

const Student = mongoose.model('Student', studentSchema);

export default Student;