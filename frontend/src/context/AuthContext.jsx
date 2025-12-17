import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/axios';

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Function to check if user is authenticated
  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }
      
      // Extract user ID from JWT token (without fully decoding)
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid token format');
      
      const payload = JSON.parse(atob(parts[1]));
      const userId = payload._id;
      
      if (!userId) throw new Error('Invalid token payload');
      
      // Fetch user data
      const response = await api.get(`/api/v1/users/${userId}`);
      setUser(response.data.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid tokens
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      const response = await api.post('/api/v1/users/login', credentials);
      const { token, user } = response.data.data;
      
      // Save token
      localStorage.setItem('token', token);
      
      // Update state
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      console.log("Starting registration process...");
      
      // Use axios directly for multipart/form-data to avoid header issues
      const response = await fetch('http://localhost:8000/api/v1/users/register', {
        method: 'POST',
        body: userData,
        credentials: 'include'
      });
      
      const data = await response.json();
      console.log("Registration response:", data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { 
        success: false, 
        message: error.message || 'Registration failed' 
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post('/api/v1/users/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Even if API fails, clear local storage
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Check auth status on mount and when token changes
  useEffect(() => {
    checkAuthStatus();
    
    // Listen for storage events (logout in other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        checkAuthStatus();
      }
    };
    
    // Listen for custom auth change event
    const handleAuthChange = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-change', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
