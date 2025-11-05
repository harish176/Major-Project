// Cloudinary configuration and upload utilities
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'manit_students';
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your-cloud-name';
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY || 'your-api-key';

// Upload image to Cloudinary
export const uploadImageToCloudinary = async (file, folder = 'student-photos') => {
  if (!file) {
    throw new Error('No file provided');
  }

  // Check if Cloudinary is configured
  if (CLOUDINARY_CLOUD_NAME === 'your-cloud-name' || !CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary is not configured. Please check your environment variables.');
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload an image file (JPEG, PNG, GIF, or WebP)');
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 5MB');
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', folder);
    
    // Add quality optimization
    formData.append('quality', 'auto');
    formData.append('fetch_format', 'auto');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary API Error:', errorData);
      
      if (response.status === 400 && errorData.error?.message?.includes('Upload preset')) {
        throw new Error('Upload preset not found. Please check your Cloudinary configuration.');
      }
      
      throw new Error(errorData.error?.message || `Upload failed with status ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      url: data.secure_url,
      public_id: data.public_id,
      original_filename: data.original_filename,
      format: data.format,
      width: data.width,
      height: data.height,
      bytes: data.bytes,
      created_at: data.created_at
    };

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    
    throw new Error(`Upload failed: ${error.message}`);
  }
};

// Delete image from Cloudinary (optional - for cleanup)
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    // This would typically be done from backend for security
    // Frontend deletion requires signed requests
    console.log('Image deletion should be handled from backend:', publicId);
    return { success: true };
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error(`Delete failed: ${error.message}`);
  }
};

// Generate optimized image URL
export const getOptimizedImageUrl = (publicId, options = {}) => {
  const {
    width = 'auto',
    height = 'auto',
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options;

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},h_${height},c_${crop},q_${quality},f_${format}/${publicId}`;
};

// Check if Cloudinary is properly configured
export const isCloudinaryConfigured = () => {
  return CLOUDINARY_CLOUD_NAME && 
         CLOUDINARY_CLOUD_NAME !== 'your-cloud-name' && 
         CLOUDINARY_UPLOAD_PRESET && 
         CLOUDINARY_UPLOAD_PRESET !== 'your-upload-preset';
};

// Get configuration status
export const getConfigurationStatus = () => {
  return {
    isConfigured: isCloudinaryConfigured(),
    cloudName: CLOUDINARY_CLOUD_NAME,
    uploadPreset: CLOUDINARY_UPLOAD_PRESET,
    hasApiKey: Boolean(CLOUDINARY_API_KEY && CLOUDINARY_API_KEY !== 'your-api-key')
  };
};

// Configuration object for easy setup
export const cloudinaryConfig = {
  cloudName: CLOUDINARY_CLOUD_NAME,
  apiKey: CLOUDINARY_API_KEY,
  uploadPreset: CLOUDINARY_UPLOAD_PRESET
};

export default {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
  getOptimizedImageUrl,
  isCloudinaryConfigured,
  getConfigurationStatus,
  cloudinaryConfig
};