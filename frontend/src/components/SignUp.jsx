import React, { useState, useRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";

const SignUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/100"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.username || !formData.password) {
      setToast({ 
        show: true, 
        message: "All fields are required", 
        type: "error" 
      });
      setLoading(false);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setToast({ 
        show: true, 
        message: "Please enter a valid email address", 
        type: "error" 
      });
      setLoading(false);
      return;
    }
    
    try {
      // Create FormData object for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("password", formData.password);

      // Get the file from the file input
      const file = fileInputRef.current.files[0];
      if (file) {
        formDataToSend.append("avatar", file);
        
        // Log file details for debugging
        console.log("File being uploaded:", {
          name: file.name,
          type: file.type,
          size: file.size
        });
      } else {
        setToast({ 
          show: true, 
          message: "Profile image is required", 
          type: "error" 
        });
        setLoading(false);
        return;
      }

      // First, test if file upload works
      try {
        console.log("Testing file upload...");
        const testResponse = await fetch('http://localhost:8000/api/v1/users/test-upload', {
          method: 'POST',
          body: formDataToSend,
          credentials: 'include'
        });
        
        const testResult = await testResponse.json();
        console.log("File upload test result:", testResult);
        
        if (!testResponse.ok) {
          throw new Error(testResult.message || "File upload test failed");
        }
      } catch (testError) {
        console.error("File upload test error:", testError);
        setToast({
          show: true,
          message: "File upload failed: " + (testError.message || "Unknown error"),
          type: "error"
        });
        setLoading(false);
        return;
      }

      // If file upload test passes, continue with registration
      console.log("Proceeding with registration...");
      const result = await register(formDataToSend);
      
      if (result.success) {
        setToast({ 
          show: true, 
          message: "Registration successful! Please sign in.", 
          type: "success" 
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          username: "",
          password: "",
        });
        setProfileImage("https://via.placeholder.com/100");
        
        // Close modal after delay
        setTimeout(() => {
          setToast({ show: false, message: "", type: "success" });
          onClose();
        }, 3000);
      } else {
        setToast({ 
          show: true, 
          message: result.message || "Registration failed. Please try again.", 
          type: "error" 
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setToast({ 
        show: true, 
        message: "An unexpected error occurred. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className={`fixed inset-0 backdrop-blur-md bg-black/75 flex justify-center items-center min-h-screen`}
      onClick={onClose}
    >
      <div
        className="shadow-lg rounded-xl p-8 w-full max-w-sm min-h-[500px]"
        style={{
          backgroundImage: `radial-gradient(circle 400px at 50% 100px, rgba(247, 14, 32, 0.5), transparent)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-4">
          <div
            className="w-20 h-20 rounded-full overflow-hidden border-3 border-purple-400 shadow-md cursor-pointer hover:scale-105 transition-transform"
            onClick={handleImageClick}
          >
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <p className="mt-1 text-xs text-gray-500">Click to upload image</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border bg-gray-500 border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border bg-gray-500 border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Enter your Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border bg-gray-500 border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          {/* Password with Eye Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border bg-gray-500 border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <span
              className="absolute right-2 top-2.5 text-black cursor-pointer text-lg"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition font-semibold shadow-sm text-sm"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>

      {/* DaisyUI Toast */}
      {toast.show && (
        <div className="toast">
          <div className={`alert ${toast.type === "error" ? "alert-error" : "alert-success"}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
