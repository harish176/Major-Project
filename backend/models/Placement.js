import mongoose from 'mongoose';

const placementSchema = new mongoose.Schema({
  // Required fields
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  scholarNumber: {
    type: String,
    required: [true, 'Scholar number is required'],
    trim: true,
    maxlength: [20, 'Scholar number cannot exceed 20 characters']
  },
  studentName: {
    type: String,
    required: false, // Will be automatically populated from student record
    trim: true,
    maxlength: [100, 'Student name cannot exceed 100 characters']
  },
  placementType: {
    type: String,
    required: [true, 'Placement type is required'],
    enum: {
      values: ['2M+PPO', '6M+PPO', '6M+FTE', 'FTE'],
      message: 'Placement type must be one of: 2M+PPO, 6M+PPO, 6M+FTE, FTE'
    }
  },
  package: {
    type: Number,
    required: [true, 'Package is required'],
    min: [0, 'Package cannot be negative']
  },

  // Optional fields
  stipend: {
    type: Number,
    min: [0, 'Stipend cannot be negative'],
    default: null
  },

  // References to other models
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    index: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Companies',
    index: true
  },

  // Additional optional fields that might be useful
  offerDate: {
    type: Date,
    default: null
  },
  joiningDate: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['offered', 'accepted', 'rejected', 'completed'],
    default: 'offered'
  },
  packageDetails: {
    currency: {
      type: String,
      default: 'INR',
      enum: ['INR', 'USD', 'EUR', 'GBP']
    },
    breakdown: {
      base: {
        type: Number,
        min: 0,
        default: null
      },
      bonus: {
        type: Number,
        min: 0,
        default: null
      },
      stockOptions: {
        type: Number,
        min: 0,
        default: null
      },
      other: {
        type: Number,
        min: 0,
        default: null
      }
    }
  },
  jobDetails: {
    role: {
      type: String,
      trim: true,
      default: null
    },
    location: {
      type: String,
      trim: true,
      default: null
    },
    department: {
      type: String,
      trim: true,
      default: null
    }
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
placementSchema.index({ scholarNumber: 1 });
placementSchema.index({ companyName: 1 });
placementSchema.index({ placementType: 1 });
placementSchema.index({ package: -1 }); // Descending for highest package first
placementSchema.index({ status: 1 });
placementSchema.index({ offerDate: -1 });
placementSchema.index({ createdAt: -1 });

// Compound indexes
placementSchema.index({ student: 1, company: 1 });
placementSchema.index({ placementType: 1, package: -1 });

// Virtual for formatted package display
placementSchema.virtual('formattedPackage').get(function() {
  if (this.package) {
    const currency = this.packageDetails?.currency || 'INR';
    if (currency === 'INR') {
      return `₹${this.package.toLocaleString('en-IN')}`;
    }
    return `${currency} ${this.package.toLocaleString()}`;
  }
  return null;
});

// Virtual for formatted stipend display
placementSchema.virtual('formattedStipend').get(function() {
  if (this.stipend) {
    const currency = this.packageDetails?.currency || 'INR';
    if (currency === 'INR') {
      return `₹${this.stipend.toLocaleString('en-IN')}`;
    }
    return `${currency} ${this.stipend.toLocaleString()}`;
  }
  return null;
});

// Method to check if placement is internship type
placementSchema.methods.isInternship = function() {
  return ['2M+PPO', '6M+PPO', '6M+FTE'].includes(this.placementType);
};

// Method to check if placement is full-time
placementSchema.methods.isFullTime = function() {
  return this.placementType === 'FTE';
};

// Static method to find placements by company
placementSchema.statics.findByCompany = function(companyName) {
  return this.find({ companyName: new RegExp(companyName, 'i') });
};

// Static method to find placements by placement type
placementSchema.statics.findByType = function(placementType) {
  return this.find({ placementType });
};

// Static method to find placements by package range
placementSchema.statics.findByPackageRange = function(minPackage, maxPackage) {
  const query = {};
  if (minPackage !== undefined) query.package = { $gte: minPackage };
  if (maxPackage !== undefined) {
    if (query.package) {
      query.package.$lte = maxPackage;
    } else {
      query.package = { $lte: maxPackage };
    }
  }
  return this.find(query);
};

// Static method to get placement statistics
placementSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalPlacements: { $sum: 1 },
        avgPackage: { $avg: '$package' },
        maxPackage: { $max: '$package' },
        minPackage: { $min: '$package' },
        internships: {
          $sum: {
            $cond: [
              { $in: ['$placementType', ['2M+PPO', '6M+PPO', '6M+FTE']] },
              1,
              0
            ]
          }
        },
        fullTimeOffers: {
          $sum: {
            $cond: [{ $eq: ['$placementType', 'FTE'] }, 1, 0]
          }
        }
      }
    }
  ]);

  return stats[0] || {
    totalPlacements: 0,
    avgPackage: 0,
    maxPackage: 0,
    minPackage: 0,
    internships: 0,
    fullTimeOffers: 0
  };
};

// Pre-save middleware to auto-populate student and company references
placementSchema.pre('save', async function(next) {
  try {
    // If student is not referenced but we have scholarNumber, try to find and link
    if (!this.student && this.scholarNumber) {
      const Student = mongoose.model('Student');
      const student = await Student.findOne({ scholarNumber: this.scholarNumber });
      if (student) {
        this.student = student._id;
        // Also ensure studentName matches
        if (!this.studentName || this.studentName !== student.studentName) {
          this.studentName = student.studentName;
        }
      } else {
        // If no student found with scholar number, we'll still allow the placement
        // but log a warning
        console.warn(`No student found with scholar number: ${this.scholarNumber}`);
      }
    }

    // If company is not referenced but we have companyName, try to find and link
    if (!this.company && this.companyName) {
      const Companies = mongoose.model('Companies');
      const company = await Companies.findOne({ 
        companyName: new RegExp(`^${this.companyName}$`, 'i') 
      });
      if (company) {
        this.company = company._id;
        // Ensure companyName matches exactly
        this.companyName = company.companyName;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Placement = mongoose.model('Placement', placementSchema);

export default Placement;
