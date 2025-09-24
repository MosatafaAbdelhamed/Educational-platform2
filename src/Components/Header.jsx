import { useState } from "react";
import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import { Link } from "react-router-dom"; // استيراد Link من react-router-dom


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full py-5">
      <div className="container flex items-center justify-between border-b border-b-white pb-5">
        {/* logo */}
        <Link to="/">
          <img src="/logo.png" alt="logo" width={170} height={50} />
        </Link>

        {/* زرار فتح المنيو على الموبايل */}
        <button className="lg:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <RiCloseLine size={30} /> : <RiMenuLine size={30} />}
        </button>

        {/* المنيو على الموبايل */}
        <nav
          className={`lg:hidden fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-95 flex flex-col items-center justify-center gap-6 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="space-y-5 text-center">
            <li>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-white hover:text-orange-500 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-white hover:text-orange-500 transition-colors"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/exams"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-white hover:text-orange-500 transition-colors"
              >
                Exams
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-white hover:text-orange-500 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-white hover:text-orange-500 transition-colors"
              >
                Contact
              </Link>
            </li>

            <li>
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-white hover:text-orange-500 transition-colors"
              >
                AdminDashboard
              </Link>
            </li>
          </ul>
          <div className="flex gap-3">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="primary-btn"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className=" second-btn"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* المنيو على الشاشات الكبيرة */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            <li>
              <Link
                to="/"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/exams"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Exams
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                AdminDashboard
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <Link to="/login" className="primary-btn">
              Login
            </Link>
            <Link
              to="/register"
              className="border border-orange-500 text-orange-500 font-medium py-2 px-4 rounded-xl transition-colors hover:bg-orange-600 hover:text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
