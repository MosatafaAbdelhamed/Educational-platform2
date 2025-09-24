import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://edu-master-psi.vercel.app/exam', {
          headers: {
            token
          }
        });
        setExams(response.data.exams);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch exams');
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="exam-list-container">
      <h1>Exams List</h1>
      <Link to="/exams/add" className="add-exam-button">Add Exam</Link>
      <ul className="exams-list">
        {exams.map((exam) => (
          <li key={exam._id} className="exam-item">
            <Link to={`/exams/${exam._id}`} className="exam-link">
              <h3>{exam.title}</h3>
              <p>Duration: {exam.duration} minutes</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamList;
