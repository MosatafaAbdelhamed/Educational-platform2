import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [remainingTimes, setRemainingTimes] = useState({}); // { [examId]: seconds }

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://edu-master-psi.vercel.app/exam', {
          headers: {
            token: token
          }
        });
        const payload = response?.data;
        const list = Array.isArray(payload?.exams)
          ? payload.exams
          : (Array.isArray(payload) ? payload : []);
        setExams(list);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch exams');
        console.error('Failed to fetch exams:', err.response || err);
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Fetch remaining time per exam after exams are loaded
  useEffect(() => {
    const fetchRemainingTimes = async () => {
      if (!exams || exams.length === 0) return;
      const token = localStorage.getItem('token');
      try {
        const results = await Promise.allSettled(
          exams.map((exam) =>
            axios.get(`https://edu-master-psi.vercel.app/studentExam/exams/remaining-time/${exam._id}` , {
              headers: { token }
            })
          )
        );
        const timesMap = {};
        results.forEach((res, idx) => {
          const examId = exams[idx]._id;
          if (res.status === 'fulfilled') {
            const seconds = res.value?.data?.remainingTime;
            if (typeof seconds === 'number') timesMap[examId] = seconds;
          }
        });
        setRemainingTimes(timesMap);
      } catch {
        // ignore per-exam time failures
      }
    };
    fetchRemainingTimes();
  }, [exams]);

  const formatTime = (seconds) => {
    if (typeof seconds !== 'number') return null;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) return <div>جارِ التحميل...</div>;
  if (error) return <div>حدث خطأ: {error}</div>;

  return (
    <div className="min-h-screen bg-white-97">
      <div className="bg-white border-b border-white-95">
        <div className="container py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-grey-15 mb-2">الامتحانات المتاحة</h1>
              <p className="text-grey-15/70">اختر امتحانًا لبدء الاختبار</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {exams.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-white-95 p-8 text-center text-grey-15/70">
            لا توجد امتحانات متاحة حاليًا
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => {
              const timeLeft = remainingTimes[exam._id];
              const hasTime = typeof timeLeft === 'number' && timeLeft > 0;
              return (
                <div key={exam._id} className="bg-white rounded-xl shadow-sm border border-white-95 p-6 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-grey-15">{exam.title}</h3>
                    {hasTime && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        timeLeft < 300 ? 'bg-red-100 text-red-600' : timeLeft < 600 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                      }`}>
                        متبقٍ: {formatTime(timeLeft)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-grey-15/70 mb-6">المدة: {exam.duration} دقيقة</p>
                  <div className="mt-auto flex items-center justify-between">
                    <Link
                      to={`/student-exams/${exam._id}`}
                      className="primary-btn"
                    >
                      {hasTime ? 'متابعة' : 'ابدأ الاختبار'}
                    </Link>
                    <Link
                      to={`/student-exams/${exam._id}`}
                      className="px-4 py-2 border border-white-95 rounded-lg text-grey-15 hover:bg-white-95 transition-colors text-sm"
                    >
                      التفاصيل
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamList;
