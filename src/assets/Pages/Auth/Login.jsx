import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // استيراد Link من react-router-dom


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Accept any credentials: create a simple token and user object
      const fakeToken = `token-${Date.now()}`;
      const user = { email, role: 'USER', fullName: email.split('@')[0] || 'User' };
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(user));
      await new Promise((resolve) => setTimeout(resolve, 400));
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    console.log("Navigate to sign up");
  };

  const handleForgotPassword = () => {
    console.log("Navigate to forgot password");
  };

  return (
    <div className="min-h-[20vh] bg-white-93 flex items-center justify-center p-4">
      <div className="w-full max-w-xl"> {/* وسعت الـ container هنا */}
        <div className="text-center mb-4">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="w-full border border-gray-200 shadow-sm rounded-lg p-8  bg-white">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 w-full px-4 rounded-md border border-gray-300 focus:border-orange-500 focus:ring-orange-500 outline-none" // وسعت الـ input هنا
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-14 w-full px-4 pr-10 rounded-md border border-gray-300 focus:border-orange-500 focus:ring-orange-500 outline-none" // وسعت الـ input هنا بردو
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-orange-600 hover:text-orange-700 focus:outline-none focus:underline transition-colors"
              >
                Forgot your password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 focus:ring-orange-500 text-white font-medium transition-colors rounded-md"
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>

            {/* Sign Up Button */}
           <div className="w-full flex justify-center">
  <Link
    to="/register"
    onClick={handleSignUp}
    className="w-full max-w-md h-12 border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-orange-500 transition-colors bg-transparent rounded-md flex items-center justify-center"
  >
Sign Up  </Link>
</div>

          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">
            By signing in, you agree to our{" "}
            <a href="#" className="text-orange-600 hover:text-orange-700 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-orange-600 hover:text-orange-700 underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
