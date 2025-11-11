import mongoose from "mongoose";

// Schema for year-specific company data
const yearlyDataSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return v >= 2000 && v <= 2100; // Reasonable year range
      },
      message: 'Year must be between 2000 and 2100'
    }
  },
  package: {
    ctc: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'INR',
      enum: ['INR', 'USD', 'EUR', 'GBP']
    },
    breakdown: {
      base: Number,
      bonus: Number,
      stockOptions: Number,
      other: Number
    }
  },
  branchesAllowed: [{
    type: String,
    required: true
  }],
  coursesAllowed: [{
    type: String,
    required: true
  }],
  interviewMode: {
    type: String,
    required: true,
    enum: ['Virtual', 'Offline', 'Hybrid']
  },
  visitDate: {
    type: Date,
    required: true
  },
  additionalInfo: {
    jobRole: String,
    jobLocation: [String],
    eligibilityCriteria: {
      minCGPA: Number,
      maxBacklogs: Number,
      other: String
    },
    selectionProcess: [String],
    bondPeriod: Number, // in months
    notes: String
  }
}, {
  _id: true
});

// Main Companies schema
const companiesSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 100
  },
  logo: {
    type: String,
    required: false,
    validate: {
      validator: function(v) {
        if (!v) return true; // Allow empty logo
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/i.test(v);
      },
      message: 'Logo must be a valid image URL'
    }
  },
  companyDetails: {
    industry: String,
    headquarters: String,
    website: String,
    description: String,
    employeeCount: String,
    founded: Number
  },
  yearlyData: {
    type: [yearlyDataSchema],
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  },
  contactInfo: {
    hrName: String,
    hrEmail: String,
    hrPhone: String,
    companyEmail: String
  },
  tags: [String], // For categorization like 'Core', 'IT', 'Finance', etc.
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
companiesSchema.index({ companyName: 1 });
companiesSchema.index({ 'yearlyData.year': 1 });
companiesSchema.index({ 'yearlyData.branchesAllowed': 1 });
companiesSchema.index({ 'yearlyData.coursesAllowed': 1 });
companiesSchema.index({ tags: 1 });
companiesSchema.index({ isActive: 1 });

// Virtual for getting data for a specific year
companiesSchema.virtual('currentYearData').get(function() {
  const currentYear = new Date().getFullYear();
  return this.yearlyData && this.yearlyData.length > 0 
    ? this.yearlyData.find(data => data.year === currentYear) 
    : null;
});

// Method to get data for a specific year
companiesSchema.methods.getDataForYear = function(year) {
  return this.yearlyData && this.yearlyData.length > 0 
    ? this.yearlyData.find(data => data.year === year) 
    : null;
};

// Method to add yearly data
companiesSchema.methods.addYearlyData = function(yearData) {
  // Initialize yearlyData if it doesn't exist
  if (!this.yearlyData) {
    this.yearlyData = [];
  }
  
  const existingIndex = this.yearlyData.findIndex(data => data.year === yearData.year);
  if (existingIndex !== -1) {
    this.yearlyData[existingIndex] = yearData;
  } else {
    this.yearlyData.push(yearData);
  }
  return this.save();
};

// Static method to find companies visiting in a date range
companiesSchema.statics.findByDateRange = function(startDate, endDate) {
  return this.find({
    'yearlyData.visitDate': {
      $gte: startDate,
      $lte: endDate
    }
  });
};

// Static method to find companies by branch
companiesSchema.statics.findByBranch = function(branch, year = null) {
  const query = { 'yearlyData.branchesAllowed': { $in: [branch, 'All Branches'] } };
  if (year) {
    query['yearlyData.year'] = year;
  }
  return this.find(query);
};

// Static method to find companies by course
companiesSchema.statics.findByCourse = function(course, year = null) {
  const query = { 'yearlyData.coursesAllowed': { $in: [course, 'All Courses'] } };
  if (year) {
    query['yearlyData.year'] = year;
  }
  return this.find(query);
};

// Pre-save middleware to validate yearly data
companiesSchema.pre('save', function(next) {
  // Ensure no duplicate years in yearlyData
  if (this.yearlyData && this.yearlyData.length > 0) {
    const years = this.yearlyData.map(data => data.year);
    const uniqueYears = [...new Set(years)];
    
    if (years.length !== uniqueYears.length) {
      const error = new Error('Duplicate years found in yearly data');
      return next(error);
    }
  }
  
  next();
});

const Companies = mongoose.model('Companies', companiesSchema);

export default Companies;