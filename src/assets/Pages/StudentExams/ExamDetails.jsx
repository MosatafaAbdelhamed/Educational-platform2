import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ExamDetails = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://edu-master-psi.vercel.app/studentExam/exams/${examId}`, {
          headers: {
            token: token
          }
        });
        setExam(response.data.exam);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch exam details');
        setLoading(false);
      }
    };

    const fetchRemainingTime = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://edu-master-psi.vercel.app/studentExam/exams/remaining-time/${examId}`, {
          headers: {
            token: token
          }
        });
        setRemainingTime(response.data.remainingTime);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch remaining time');
      }
    };

    fetchExamDetails();
    fetchRemainingTime();
  }, [examId]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartExam = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://edu-master-psi.vercel.app/studentExam/start/${examId}`, {}, {
        headers: { token }
      });
    } catch {
      // ignore and proceed to start page; backend may enforce idempotency
    } finally {
      navigate(`/student-exams/${examId}/start`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-50 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-grey-15/70">Loading exam details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
          </div>
          <h3 className="text-xl font-semibold text-grey-15 mb-2">Error Loading Exam</h3>
          <p className="text-grey-15/70 mb-6">{error}</p>
          <Link to="/student-exams" className="primary-btn">Back to Exams</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-97">
      <div className="bg-white border-b border-white-95">
        <div className="container py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-grey-15 mb-2">{exam.title}</h1>
              <p className="text-grey-15/70">المدة: {exam.duration} دقيقة</p>
            </div>
            <div className="text-sm text-grey-15/60">
              الوقت المتبقي: <span className="font-semibold text-grey-15">{formatTime(remainingTime)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-white-95 p-6">
            <h2 className="text-xl font-semibold text-grey-15 mb-4">نظرة عامة على الامتحان</h2>
            <ul className="list-disc pl-5 text-grey-15/70 space-y-2">
              <li>عدد الأسئلة: {exam.totalQuestions || '—'}</li>
              <li>درجة النجاح: {exam.passingMarks || '—'}</li>
              <li>إجمالي الدرجات: {exam.totalMarks || '—'}</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-white-95 p-6">
            <h3 className="text-lg font-semibold text-grey-15 mb-4">إجراءات</h3>
            <button onClick={handleStartExam} className="w-full primary-btn">ابدأ الامتحان</button>
            <Link to="/student-exams" className="w-full secondary-btn mt-3 inline-flex justify-center">رجوع للامتحانات</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetails;
