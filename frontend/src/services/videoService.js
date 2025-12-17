import api from '../config/axios';

// Video service object for handling all video-related API calls
const videoService = {
  // Get all videos for homepage/feed
  getAllVideos: async (page = 1, limit = 12) => {
    try {
      const response = await api.get(`/api/v1/videos?page=${page}&limit=${limit}`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Failed to fetch videos:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch videos'
      };
    }
  },
  
  // Get a single video by ID
  getVideoById: async (videoId) => {
    try {
      const response = await api.get(`/api/v1/videos/${videoId}`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error(`Failed to fetch video ${videoId}:`, error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch video'
      };
    }
  },
  
  // Upload a new video
  uploadVideo: async (videoData) => {
    try {
      const response = await api.post('/api/v1/videos', videoData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Failed to upload video:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to upload video'
      };
    }
  },
  
  // Delete a video
  deleteVideo: async (videoId) => {
    try {
      await api.delete(`/api/v1/videos/${videoId}`);
      return {
        success: true
      };
    } catch (error) {
      console.error(`Failed to delete video ${videoId}:`, error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete video'
      };
    }
  },
  
  // Search videos
  searchVideos: async (query) => {
    try {
      const response = await api.get(`/api/v1/videos/search?query=${encodeURIComponent(query)}`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Search failed:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Search failed'
      };
    }
  },
  
  // Get current user's videos
  getUserVideos: async () => {
    try {
      const response = await api.get('/api/v1/videos/user-videos');
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Failed to fetch user videos:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch your videos'
      };
    }
  }
};

export default videoService;
