import api from '../config/axios';

// User service object for handling all user-related API calls
const userService = {
  // Get user profile by ID
  getUserProfile: async (userId) => {
    try {
      const response = await api.get(`/api/v1/users/${userId}`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error(`Failed to fetch user profile ${userId}:`, error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch user profile'
      };
    }
  },
  
  // Update user profile (future functionality)
  updateProfile: async (userData) => {
    try {
      const response = await api.patch('/api/v1/users/me', userData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Failed to update profile:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile'
      };
    }
  }
};

export default userService;
