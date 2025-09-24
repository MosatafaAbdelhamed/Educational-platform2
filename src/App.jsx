import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Profile from './assets/Pages/Profile';
import Home from './assets/Pages/Home';
import Courses from './assets/Pages/Courses';
import About from './assets/Pages/About';
import Pricing from './assets/Pages/Pricing';
import Contact from './assets/Pages/Contact';
import Login from './assets/Pages/Auth/Login';
import Register from './assets/Pages/Auth/Register';
import ForgotPassword from './assets/Pages/Auth/ForgotPassword';
import ResetPassword from './assets/Pages/Auth/ResetPassword';
import StudentExamList from './assets/Pages/StudentExams/ExamList';
import StudentExamDetails from './assets/Pages/StudentExams/ExamDetails';
import StartExam from './assets/Pages/StudentExams/StartExam';
import SubmitExam from './assets/Pages/StudentExams/SubmitExam';
import LessonsList from './assets/Pages/Lesson/LessonsList';
import LessonDetails from './assets/Pages/Lesson/LessonDetails';
import AddLesson from './assets/Pages/Lesson/AddLesson';
import EditLesson from './assets/Pages/Lesson/EditLesson';
import PurchasedLessons from './assets/Pages/Lesson/PurchasedLessons';
import PaymentPage from './assets/Pages/Lesson/PaymentPage';
import QuestionsList from './assets/Pages/Questions/QuestionsList';
import QuestionDetails from './assets/Pages/Questions/QuestionDetails';
import AddQuestion from './assets/Pages/Questions/AddQuestion';
import EditQuestion from './assets/Pages/Questions/EditQuestion';
import ExamList from './assets/Pages/Exams/ExamList';
import ExamDetails from './assets/Pages/Exams/ExamDetails';
import AddExam from './assets/Pages/Exams/AddExam';
import EditExam from './assets/Pages/Exams/EditExam';
import PublicExams from './assets/Pages/Exams/PublicExams';
import CreateAdmin from './assets/Pages/Admin/CreateAdmin';
import AdminList from './assets/Pages/Admin/AdminList';
import UserList from './assets/Pages/Admin/UserList';
import AdminDashboard from './assets/Pages/Admin/AdminDashboard';
import Reports from './assets/Pages/Admin/Reports';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return children;
};

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('https://edu-master-psi.vercel.app/user/', { headers: { token } });
        const payload = response?.data;
        const user = payload?.user || payload?.data || payload;
        const role = user?.role || 'USER';
        if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
          setAllowed(true);
        } else {
          navigate('/');
        }
      } catch {
        navigate('/');
      } finally {
        setChecking(false);
      }
    };
    verify();
  }, [navigate]);

  if (checking) return null;
  return allowed ? children : null;
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/student-exams" element={<PrivateRoute><StudentExamList /></PrivateRoute>} />
            <Route path="/student-exams/:examId" element={<PrivateRoute><StudentExamDetails /></PrivateRoute>} />
            <Route path="/student-exams/:examId/start" element={<PrivateRoute><StartExam /></PrivateRoute>} />
            <Route path="/student-exams/:examId/submit" element={<PrivateRoute><SubmitExam /></PrivateRoute>} />
            <Route path="/lessons" element={<PrivateRoute><LessonsList /></PrivateRoute>} />
            <Route path="/lessons/:lessonId" element={<PrivateRoute><LessonDetails /></PrivateRoute>} />
            <Route path="/lessons/add" element={<PrivateRoute><AddLesson /></PrivateRoute>} />
            <Route path="/lessons/:lessonId/edit" element={<PrivateRoute><EditLesson /></PrivateRoute>} />
            <Route path="/lessons/purchased" element={<PrivateRoute><PurchasedLessons /></PrivateRoute>} />
            <Route path="/lessons/:lessonId/payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
            <Route path="/questions" element={<AdminRoute><QuestionsList /></AdminRoute>} />
            <Route path="/questions/:questionId" element={<AdminRoute><QuestionDetails /></AdminRoute>} />
            <Route path="/questions/add" element={<AdminRoute><AddQuestion /></AdminRoute>} />
            <Route path="/questions/:questionId/edit" element={<AdminRoute><EditQuestion /></AdminRoute>} />
            <Route path="/exams" element={<PublicExams />} />
            <Route path="/exams/:examId" element={<AdminRoute><ExamDetails /></AdminRoute>} />
            <Route path="/exams/add" element={<AdminRoute><AddExam /></AdminRoute>} />
            <Route path="/exams/:examId/edit" element={<AdminRoute><EditExam /></AdminRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/create-admin" element={<AdminRoute><CreateAdmin /></AdminRoute>} />
            <Route path="/admin/admins" element={<AdminRoute><AdminList /></AdminRoute>} />
            <Route path="/admin/reports" element={<AdminRoute><Reports /></AdminRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/admin" element={<CreateAdmin />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="Admin" element={<AdminList />} />
          {/* ممكن تضيف Settings بعدين */}
        </Route>
          </Routes>
          
          
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App