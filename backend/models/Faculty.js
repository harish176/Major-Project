import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const facultySchema = new mongoose.Schema({
  // Basic Identification
  facultyId: {
    type: String,
    required: [true, 'Faculty ID is required'],
    unique: true,
    trim: true,
    uppercase: true,
    maxlength: [20, 'Faculty ID cannot exceed 20 characters']
  },

  // Personal Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [50, 'Middle name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: function(v) {
        return !v || v < new Date();
      },
      message: 'Date of birth must be in the past'
    }
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: 'Please provide a valid 10-digit contact number'
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
    enum: ['faculty', 'admin'],
    default: 'faculty'
  },

  // Address Information
  permanentAddress: {
    street: {
      type: String,
      trim: true,
      maxlength: [200, 'Street address cannot exceed 200 characters']
    },
    city: {
      type: String,
      trim: true,
      maxlength: [50, 'City cannot exceed 50 characters']
    },
    state: {
      type: String,
      trim: true,
      maxlength: [50, 'State cannot exceed 50 characters']
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
    country: {
      type: String,
      trim: true,
      maxlength: [50, 'Country cannot exceed 50 characters'],
      default: 'India'
    }
  },
  currentAddress: {
    street: {
      type: String,
      trim: true,
      maxlength: [200, 'Street address cannot exceed 200 characters']
    },
    city: {
      type: String,
      trim: true,
      maxlength: [50, 'City cannot exceed 50 characters']
    },
    state: {
      type: String,
      trim: true,
      maxlength: [50, 'State cannot exceed 50 characters']
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
    country: {
      type: String,
      trim: true,
      maxlength: [50, 'Country cannot exceed 50 characters'],
      default: 'India'
    }
  },

  // Personal Details
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed']
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
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

  // Emergency Contact
  emergencyContact: {
    name: {
      type: String,
      trim: true,
      maxlength: [100, 'Emergency contact name cannot exceed 100 characters']
    },
    relationship: {
      type: String,
      trim: true,
      maxlength: [50, 'Relationship cannot exceed 50 characters']
    },
    contactNumber: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^\d{10}$/.test(v);
        },
        message: 'Please provide a valid 10-digit emergency contact number'
      }
    },
    address: {
      type: String,
      trim: true,
      maxlength: [300, 'Emergency contact address cannot exceed 300 characters']
    }
  },

  // Educational Qualifications
  qualifications: [{
    degree: {
      type: String,
      enum: ['B.Sc.', 'M.Sc.', 'B.Tech', 'M.Tech', 'Ph.D.', 'B.A.', 'M.A.', 'B.Com', 'M.Com', 'MBA', 'MCA', 'Other'],
      trim: true
    },
    specialization: {
      type: String,
      trim: true,
      maxlength: [100, 'Specialization cannot exceed 100 characters']
    },
    university: {
      type: String,
      trim: true,
      maxlength: [150, 'University name cannot exceed 150 characters']
    },
    yearOfPassing: {
      type: Number,
      min: [1950, 'Year of passing must be after 1950'],
      max: [new Date().getFullYear(), 'Year of passing cannot be in the future']
    },
    percentage: {
      type: Number,
      min: [0, 'Percentage cannot be negative'],
      max: [100, 'Percentage cannot exceed 100']
    },
    cgpa: {
      type: Number,
      min: [0, 'CGPA cannot be negative'],
      max: [10, 'CGPA cannot exceed 10']
    }
  }],

  // Additional Certifications
  certifications: [{
    name: {
      type: String,
      trim: true,
      maxlength: [150, 'Certification name cannot exceed 150 characters']
    },
    issuingOrganization: {
      type: String,
      trim: true,
      maxlength: [150, 'Organization name cannot exceed 150 characters']
    },
    dateObtained: {
      type: Date,
      required: [true, 'Date obtained is required']
    },
    validTill: {
      type: Date
    },
    certificateUrl: {
      type: String
    }
  }],

  // Professional Information
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
    maxlength: [100, 'Department name cannot exceed 100 characters']
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    enum: ['Assistant Professor', 'Associate Professor', 'Professor', 'HOD', 'Lecturer', 'Senior Lecturer', 'Principal', 'Director', 'Other'],
    trim: true
  },
  otherDesignation: {
    type: String,
    trim: true,
    maxlength: [100, 'Other designation cannot exceed 100 characters']
  },
  employeeType: {
    type: String,
    enum: ['Permanent', 'Temporary', 'Visiting', 'Contract', 'Adhoc']
  },
  dateOfJoining: {
    type: Date
  },
  totalExperience: {
    type: Number,
    min: [0, 'Experience cannot be negative']
  },
  previousInstitutions: [{
    institutionName: {
      type: String,
      trim: true,
      maxlength: [150, 'Institution name cannot exceed 150 characters']
    },
    designation: {
      type: String,
      trim: true,
      maxlength: [100, 'Designation cannot exceed 100 characters']
    },
    duration: {
      from: {
        type: Date,
        required: [true, 'Start date is required']
      },
      to: {
        type: Date,
        required: [true, 'End date is required']
      }
    }
  }],

  // Areas of Expertise
  areasOfExpertise: [{
    type: String,
    trim: true,
    maxlength: [100, 'Area of expertise cannot exceed 100 characters']
  }],
  subjectsTaught: [{
    type: String,
    trim: true,
    maxlength: [100, 'Subject name cannot exceed 100 characters']
  }],
  researchInterests: [{
    type: String,
    trim: true,
    maxlength: [150, 'Research interest cannot exceed 150 characters']
  }],

  // Academic Activities
  coursesTaught: [{
    courseCode: {
      type: String,
      required: [true, 'Course code is required'],
      trim: true,
      maxlength: [20, 'Course code cannot exceed 20 characters']
    },
    courseName: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
      maxlength: [150, 'Course name cannot exceed 150 characters']
    },
    semester: {
      type: String,
      required: [true, 'Semester is required'],
      trim: true
    },
    academicYear: {
      type: String,
      required: [true, 'Academic year is required'],
      trim: true
    },
    credits: {
      type: Number,
      min: [1, 'Credits must be at least 1'],
      max: [10, 'Credits cannot exceed 10']
    }
  }],

  // Research Activities
  researchProjects: [{
    title: {
      type: String,
      trim: true,
      maxlength: [300, 'Project title cannot exceed 300 characters']
    },
    fundingAgency: {
      type: String,
      trim: true,
      maxlength: [150, 'Funding agency cannot exceed 150 characters']
    },
    amount: {
      type: Number,
      min: [0, 'Project amount cannot be negative']
    },
    duration: {
      from: {
        type: Date,
        required: [true, 'Project start date is required']
      },
      to: {
        type: Date,
        required: [true, 'Project end date is required']
      }
    },
    status: {
      type: String,
      enum: ['Ongoing', 'Completed', 'Approved', 'Under Review'],
      default: 'Ongoing'
    },
    role: {
      type: String,
      enum: ['Principal Investigator', 'Co-Principal Investigator', 'Co-Investigator', 'Research Associate'],
      required: [true, 'Project role is required']
    }
  }],

  // Publications
  publications: [{
    type: {
      type: String,
      enum: ['Journal Paper', 'Conference Paper', 'Book', 'Book Chapter', 'Patent', 'Other'],
    },
    title: {
      type: String,
      required: [true, 'Publication title is required'],
      trim: true,
      maxlength: [500, 'Publication title cannot exceed 500 characters']
    },
    authors: [{
      type: String,
      trim: true,
      maxlength: [100, 'Author name cannot exceed 100 characters']
    }],
    journal: {
      type: String,
      trim: true,
      maxlength: [200, 'Journal name cannot exceed 200 characters']
    },
    conference: {
      type: String,
      trim: true,
      maxlength: [200, 'Conference name cannot exceed 200 characters']
    },
    volume: {
      type: String,
      trim: true
    },
    issue: {
      type: String,
      trim: true
    },
    pages: {
      type: String,
      trim: true
    },
    year: {
      type: Number,
      min: [1900, 'Publication year must be after 1900'],
      max: [new Date().getFullYear() + 1, 'Publication year cannot be more than 1 year in future']
    },
    doi: {
      type: String,
      trim: true
    },
    url: {
      type: String,
      trim: true
    },
    impactFactor: {
      type: Number,
      min: [0, 'Impact factor cannot be negative']
    }
  }],

  // Patents
  patents: [{
    title: {
      type: String,
      trim: true,
      maxlength: [300, 'Patent title cannot exceed 300 characters']
    },
    inventors: [{
      type: String,
      trim: true,
      maxlength: [100, 'Inventor name cannot exceed 100 characters']
    }],
    patentNumber: {
      type: String,
      trim: true,
      maxlength: [50, 'Patent number cannot exceed 50 characters']
    },
    filingDate: {
      type: Date,
      required: [true, 'Filing date is required']
    },
    grantDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['Filed', 'Published', 'Granted', 'Rejected'],
      default: 'Filed'
    }
  }],


 

  // Awards and Recognition
  awards: [{
    title: {
      type: String,
      trim: true,
      maxlength: [200, 'Award title cannot exceed 200 characters']
    },
    awardingBody: {
      type: String,
      trim: true,
      maxlength: [150, 'Awarding body cannot exceed 150 characters']
    },
    year: {
      type: Number,
      min: [1950, 'Award year must be after 1950'],
      max: [new Date().getFullYear(), 'Award year cannot be in future']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Award description cannot exceed 500 characters']
    }
  }],

  // Administrative Roles
  administrativeRoles: [{
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
      maxlength: [100, 'Role cannot exceed 100 characters']
    },
    department: {
      type: String,
      trim: true,
      maxlength: [100, 'Department cannot exceed 100 characters']
    },
    duration: {
      from: {
        type: Date,
        required: [true, 'Start date is required']
      },
      to: {
        type: Date
      }
    },
    responsibilities: [{
      type: String,
      trim: true,
      maxlength: [200, 'Responsibility cannot exceed 200 characters']
    }]
  }],

  // Committee Memberships
  committees: [{
    name: {
      type: String,
      trim: true,
      maxlength: [150, 'Committee name cannot exceed 150 characters']
    },
    type: {
      type: String,
      enum: ['Academic Council', 'NAAC', 'NBA', 'Research Committee', 'Examination Committee', 'Purchase Committee', 'Other'],
    },
    role: {
      type: String,
      enum: ['Chairperson', 'Member', 'Secretary', 'Convener'],
      default: 'Member'
    },
    duration: {
      from: {
        type: Date,
        required: [true, 'Start date is required']
      },
      to: {
        type: Date
      }
    }
  }],

  // Financial Information
  bankDetails: {
    accountNumber: {
      type: String,
      required: [true, 'Bank account number is required'],
      trim: true,
      validate: {
        validator: function(v) {
          return /^\d{9,18}$/.test(v);
        },
        message: 'Please provide a valid bank account number'
      }
    },
    bankName: {
      type: String,
      required: [true, 'Bank name is required'],
      trim: true,
      maxlength: [100, 'Bank name cannot exceed 100 characters']
    },
    ifscCode: {
      type: String,
      trim: true,
      uppercase: true
    },
    branchName: {
      type: String,
      trim: true,
      maxlength: [100, 'Branch name cannot exceed 100 characters']
    }
  },
  panNumber: {
    type: String,
    required: [true, 'PAN number is required'],
    unique: true,
    trim: true,
    uppercase: true,
    validate: {
      validator: function(v) {
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v);
      },
      message: 'Please provide a valid PAN number'
    }
  },
  aadharNumber: {
    type: String,
    unique: true,
    sparse: true,
    validate: {
      validator: function(v) {
        return !v || /^\d{12}$/.test(v);
      },
      message: 'Please provide a valid 12-digit Aadhar number'
    }
  },
  pfNumber: {
    type: String,
    trim: true,
    maxlength: [50, 'PF number cannot exceed 50 characters']
  },

  // Salary Information
  salaryDetails: {
    basicPay: {
      type: Number,
      required: [true, 'Basic pay is required'],
      min: [0, 'Basic pay cannot be negative']
    },
    allowances: {
      hra: {
        type: Number,
        min: [0, 'HRA cannot be negative'],
        default: 0
      },
      da: {
        type: Number,
        min: [0, 'DA cannot be negative'],
        default: 0
      },
      medical: {
        type: Number,
        min: [0, 'Medical allowance cannot be negative'],
        default: 0
      },
      transport: {
        type: Number,
        min: [0, 'Transport allowance cannot be negative'],
        default: 0
      },
      other: {
        type: Number,
        min: [0, 'Other allowances cannot be negative'],
        default: 0
      }
    },
    deductions: {
      pf: {
        type: Number,
        min: [0, 'PF deduction cannot be negative'],
        default: 0
      },
      tax: {
        type: Number,
        min: [0, 'Tax deduction cannot be negative'],
        default: 0
      },
      insurance: {
        type: Number,
        min: [0, 'Insurance deduction cannot be negative'],
        default: 0
      },
      other: {
        type: Number,
        min: [0, 'Other deductions cannot be negative'],
        default: 0
      }
    }
  },

  // System Fields
  status: {
    type: String,
    enum: ['active', 'inactive', 'retired', 'terminated'],
    default: 'active'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { 
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

// Indexes for better performance
// Note: facultyId, email, and contactNumber already have unique indexes from field definitions
facultySchema.index({ department: 1 });
facultySchema.index({ designation: 1 });
facultySchema.index({ status: 1 });
facultySchema.index({ createdAt: -1 });

// Hash password before saving
facultySchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
facultySchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method to find faculty by email or contact
facultySchema.statics.findByEmailOrContact = function(email, contactNumber) {
  return this.findOne({
    $or: [{ email }, { contactNumber }]
  });
};

// Virtual for full name
facultySchema.virtual('fullName').get(function() {
  const names = [this.firstName, this.middleName, this.lastName].filter(Boolean);
  return names.join(' ');
});

// Virtual for age calculation
facultySchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Virtual for total salary
facultySchema.virtual('totalSalary').get(function() {
  if (!this.salaryDetails) return 0;
  const allowances = this.salaryDetails.allowances;
  const totalAllowances = (allowances.hra || 0) + (allowances.da || 0) + 
                         (allowances.medical || 0) + (allowances.transport || 0) + 
                         (allowances.other || 0);
  return this.salaryDetails.basicPay + totalAllowances;
});

// Virtual for total deductions
facultySchema.virtual('totalDeductions').get(function() {
  if (!this.salaryDetails || !this.salaryDetails.deductions) return 0;
  const deductions = this.salaryDetails.deductions;
  return (deductions.pf || 0) + (deductions.tax || 0) + 
         (deductions.insurance || 0) + (deductions.other || 0);
});

// Virtual for net salary
facultySchema.virtual('netSalary').get(function() {
  return this.totalSalary - this.totalDeductions;
});

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;