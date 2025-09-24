import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // استيراد Link من react-router-dom

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    classLevel: "Grade 1 Secondary",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Accept any data and auto-login
      const fakeToken = `token-${Date.now()}`;
      const user = { 
        email: formData.email, 
        fullName: formData.fullName || 'User', 
        classLevel: formData.classLevel,
        role: 'USER'
      };
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(user));
      await new Promise((resolve) => setTimeout(resolve, 400));
      navigate('/');
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[20vh] bg-white-93 flex items-center justify-center p-4">
       <div className="w-full max-w-6xl">
        {/* Logo */}
        <div className="text-center mb-8">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-xl mb-4">
            <span className="text-white font-bold text-xl">SP</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">SkillPath</h1>
          <p className="text-gray-500 mt-1">Create your account</p> */}
          <h2 className="text-2xl font-semibold text-gray-900 text-center ">
            Create your account
          </h2>
        </div>

        {/* Form container */}
        <div className="border border-gray-200 shadow-sm rounded-xl p-4 bg-white">
          
          <p className="text-gray-500 text-center text-2xl mb-6">
            Sign Up
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name + Email */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  required
                  className="h-11 w-full rounded-lg border border-gray-300 px-3 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="h-11 w-full rounded-lg border border-gray-300 px-3 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Phone Number + Class Level */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="phoneNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  required
                  className="h-11 w-full rounded-lg border border-gray-300 px-3 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="classLevel"
                  className="text-sm font-medium text-gray-700"
                >
                  Class Level
                </label>
                <select
                  id="classLevel"
                  value={formData.classLevel}
                  onChange={(e) =>
                    handleInputChange("classLevel", e.target.value)
                  }
                  className="h-11 w-full rounded-lg border border-gray-300 px-3 focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="Grade 1 Secondary">Grade 1 Secondary</option>
                  <option value="Grade 2 Secondary">Grade 2 Secondary</option>
                  <option value="Grade 3 Secondary">Grade 3 Secondary</option>
                  <option value="University Year 1">University Year 1</option>
                  <option value="University Year 2">University Year 2</option>
                  <option value="University Year 3">University Year 3</option>
                  <option value="University Year 4">University Year 4</option>
                </select>
              </div>
            </div>

            {/* Password + Confirm Password */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    required
                    className="h-11 w-full rounded-lg border border-gray-300 px-3 focus:border-orange-500 focus:ring-orange-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    required
                    className="h-11 w-full rounded-lg border border-gray-300 px-3 focus:border-orange-500 focus:ring-orange-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg mt-6 transition-colors"
            >
              {isLoading ? "Creating account..." : "Register"}
            </button>

            <div className="text-center mt-4">
              <Link to="/login"
              
                type="button"
                onClick={() => console.log("Navigate to login")}
                className="text-sm text-gray-600 hover:text-orange-500 focus:outline-none focus:underline transition-colors"
              >
                I already have an account 
                </Link>
              
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">
            By signing up, you agree to our{" "}
            <a
              href="#"
              className="text-orange-500 hover:text-orange-700 underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-orange-500 hover:text-orange-700 underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
