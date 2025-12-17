import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = ({onClose}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData);
      
      if (result.success) {
        setToast({ 
          show: true, 
          message: "Sign in successful! Redirecting...", 
          type: "success" 
        });
        
        // Close the modal and redirect
        setTimeout(() => {
          onClose();
          navigate('/');
          window.location.reload(); // Reload to update state completely
        }, 1500);
      } else {
        setToast({ 
          show: true, 
          message: result.message || "Sign in failed. Please check your credentials.", 
          type: "error" 
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setToast({ 
        show: true, 
        message: "An unexpected error occurred. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/75 flex justify-center items-center min-h-screen"
    onClick={onClose}>
      <div
        className="shadow-xl rounded-xl p-8 w-full max-w-md"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(247,14,32,0.4), transparent)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Enter your Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border bg-gray-500 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border bg-gray-500 border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-black"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition font-semibold shadow-md"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
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

export default SignIn;
