import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Notice title is required'],
      trim: true,
      maxlength: [500, 'Notice title cannot exceed 500 characters']
    },
    content: {
      type: String,
      trim: true,
      default: ''
    },
    image: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    pdf: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TPCMember',
      default: null
    },
    dateText: {
      type: String,
      trim: true,
      default: ''
    },
    isNew: {
      type: Boolean,
      default: false
    },
    publishedAt: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

noticeSchema.index({ isActive: 1, createdAt: -1 });

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;