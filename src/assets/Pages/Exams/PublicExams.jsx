import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const sampleExams = [
  { _id: 'exam-1', title: 'Math Placement Test', duration: 30 },
  { _id: 'exam-2', title: 'Physics Fundamentals Quiz', duration: 20 },
  { _id: 'exam-3', title: 'Chemistry Basics Check', duration: 25 }
];

const PublicExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get('https://edu-master-psi.vercel.app/exam');
        const payload = res?.data;
        const list = Array.isArray(payload?.exams) ? payload.exams : (Array.isArray(payload) ? payload : []);
        if (!list || list.length === 0) {
          setExams(sampleExams);
        } else {
          setExams(list);
        }
        setLoading(false);
      } catch (e) {
        setExams(sampleExams);
        setError('');
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  return (
    <div className="min-h-screen bg-white-97">
      <div className="bg-white border-b border-white-95">
        <div className="container py-8">
          <h1 className="text-3xl font-bold text-grey-15 mb-2">Exams</h1>
          <p className="text-grey-15/70">Browse available exams. Login required to start.</p>
        </div>
      </div>

      <div className="container py-8">
        {loading ? (
          <div className="text-center py-16">Loading exams...</div>
        ) : exams.length === 0 ? (
          <div className="text-center py-16">No exams found</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map(exam => (
              <div key={exam._id} className="bg-white rounded-xl shadow-sm border border-white-95 p-6 flex flex-col">
                <h3 className="text-lg font-semibold text-grey-15 mb-2">{exam.title}</h3>
                <p className="text-sm text-grey-15/70 mb-6">Duration: {exam.duration} min</p>
                <div className="mt-auto flex items-center justify-between">
                  <Link to={`/student-exams/${exam._id}`} className="primary-btn">View</Link>
                  <Link to="/login" className="px-4 py-2 border border-white-95 rounded-lg text-grey-15 hover:bg-white-95 transition-colors text-sm">Login to start</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicExams;


