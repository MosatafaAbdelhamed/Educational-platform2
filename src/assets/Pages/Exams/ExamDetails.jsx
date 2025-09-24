import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ExamDetails = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://edu-master-psi.vercel.app/exam/get/${examId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setExam(response.data.exam);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch exam details');
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [examId]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://edu-master-psi.vercel.app/exam/${examId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/exams');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete exam');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="exam-details-container">
      <h1>Exam Details</h1>
      <div className="exam-details">
        <h3>{exam.title}</h3>
        <p>Duration: {exam.duration} minutes</p>
        <p>Total Marks: {exam.totalMarks}</p>
        <p>Passing Marks: {exam.passingMarks}</p>
      </div>
      <div className="exam-actions">
        <Link to={`/exams/${examId}/edit`} className="edit-button">Edit Exam</Link>
        <button onClick={handleDelete} className="delete-button">Delete Exam</button>
      </div>
    </div>
  );
};

export default ExamDetails;
