import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    text: '',
    type: 'multiple-choice',
    options: ['', '', '', ''],
    correctAnswer: '',
    exam: '',
    points: 1
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({
      ...formData,
      options: newOptions
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://edu-master-psi.vercel.app/question', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/questions');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add question');
    }
  };

  return (
    <div className="add-question-container">
      <h1>Add Question</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question Text:</label>
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Question Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="short-answer">Short Answer</option>
          </select>
        </div>
        <div className="form-group">
          <label>Points:</label>
          <input
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Exam ID:</label>
          <input
            type="text"
            name="exam"
            value={formData.exam}
            onChange={handleChange}
            required
          />
        </div>
        <div className="options-container">
          <label>Options:</label>
          {formData.options.map((option, index) => (
            <div key={index} className="option-input">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
            </div>
          ))}
        </div>
        <div className="form-group">
          <label>Correct Answer:</label>
          <input
            type="text"
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Question</button>
      </form>
    </div>
  );
};

export default AddQuestion;
