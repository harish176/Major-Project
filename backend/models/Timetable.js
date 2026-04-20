import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: [true, 'Branch is required'],
    trim: true,
    maxlength: [120, 'Branch cannot exceed 120 characters']
  },
  section: {
    type: String,
    required: [true, 'Section is required'],
    trim: true,
    maxlength: [20, 'Section cannot exceed 20 characters']
  },
  title: {
    type: String,
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  semester: {
    type: String,
    trim: true,
    maxlength: [30, 'Semester cannot exceed 30 characters']
  },
  academicYear: {
    type: String,
    trim: true,
    maxlength: [30, 'Academic year cannot exceed 30 characters']
  },
  timetableUrl: {
    type: String,
    trim: true
  },
  schedule: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  entries: [{
    day: {
      type: String,
      trim: true
    },
    timeSlot: {
      type: String,
      trim: true
    },
    time: {
      type: String,
      trim: true
    },
    subject: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    subjectName: {
      type: String,
      trim: true
    },
    teacher: {
      type: String,
      trim: true
    },
    room: {
      type: String,
      trim: true
    }
  }],
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

timetableSchema.index({ branch: 1, section: 1, isActive: 1 });
timetableSchema.index({ updatedAt: -1 });

const Timetable = mongoose.model('Timetable', timetableSchema);

export default Timetable;