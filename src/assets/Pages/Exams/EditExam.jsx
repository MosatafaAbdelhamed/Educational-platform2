import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditExam = () => {
  const { examId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 60,
    totalMarks: 100,
    passingMarks: 50,
    questions: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
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
        setFormData(response.data.exam);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch exam details');
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [examId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://edu-master-psi.vercel.app/exam/${examId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/exams');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update exam');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-exam-container">
      <h1>Edit Exam</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Total Marks:</label>
          <input
            type="number"
            name="totalMarks"
            value={formData.totalMarks}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Passing Marks:</label>
          <input
            type="number"
            name="passingMarks"
            value={formData.passingMarks}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Update Exam</button>
      </form>
    </div>
  );
};

export default EditExam;
