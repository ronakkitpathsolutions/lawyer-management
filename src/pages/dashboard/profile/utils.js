/**
 * Formats profile image URL
 * @param {string} profilePath - The profile path from API
 * @param {string} baseUrl - Base URL for the API
 * @returns {string|null} - Formatted image URL or null
 */
export const formatProfileImageUrl = (profilePath, baseUrl) => {
  if (!profilePath || profilePath === 'binary file') return null;
  
  // If it's already a full URL, return as is
  if (profilePath.startsWith('http')) return profilePath;
  
  // If it's a relative path, combine with base URL
  return `${baseUrl}${profilePath.startsWith('/') ? '' : '/'}${profilePath}`;
};

/**
 * Validates image file for profile upload
 * @param {File} file - The file to validate
 * @returns {Object} - Validation result
 */
export const validateProfileImage = (file) => {
  const result = {
    isValid: true,
    error: null
  };

  if (!file) {
    result.isValid = false;
    result.error = 'No file selected';
    return result;
  }

  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    result.isValid = false;
    result.error = 'Please select a valid image file (JPEG, PNG, GIF)';
    return result;
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    result.isValid = false;
    result.error = 'Image size must be less than 5MB';
    return result;
  }

  return result;
};

/**
 * Gets user initials from name
 * @param {string} name - User's full name
 * @returns {string} - User initials
 */
export const getUserInitials = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
