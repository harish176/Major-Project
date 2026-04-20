import Notice from '../models/Notice.js';

export const getAllNotices = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 0;

    const query = {
      $or: [
        { isActive: true },
        { isActive: { $exists: false } }
      ]
    };

    const pipeline = [
      { $match: query },
      {
        $addFields: {
          effectivePublishedAt: {
            $ifNull: ['$publishedAt', { $ifNull: ['$createdAt', '$updatedAt'] }]
          }
        }
      },
      { $sort: { effectivePublishedAt: -1, createdAt: -1, _id: -1 } }
    ];

    if (limit > 0) {
      pipeline.push({ $limit: limit });
    }

    const notices = await Notice.aggregate(pipeline);
    const normalizedNotices = notices.map((notice) => {
      const publishedAt = notice.publishedAt || notice.createdAt || notice.updatedAt;
      const noticeObj = notice;
      const pdfAsset = noticeObj.pdf;
      const pdfUrl = typeof pdfAsset === 'string'
        ? pdfAsset
        : (
          pdfAsset?.url
          || pdfAsset?.secure_url
          || pdfAsset?.fileUrl
          || pdfAsset?.fileURL
          || pdfAsset?.downloadUrl
          || pdfAsset?.path
          || pdfAsset?.location
          || null
        );

      return {
        ...noticeObj,
        publishedAt,
        pdfUrl,
        dateText: notice.dateText || '',
        isNew: typeof notice.isNew === 'boolean'
          ? notice.isNew
          : (publishedAt ? (Date.now() - new Date(publishedAt).getTime()) <= (7 * 24 * 60 * 60 * 1000) : false)
      };
    });

    res.status(200).json({
      success: true,
      data: normalizedNotices
    });
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notices',
      error: error.message
    });
  }
};