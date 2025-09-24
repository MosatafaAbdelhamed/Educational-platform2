import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditLesson = () => {
  const { lessonId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    isPaid: false,
    price: 0
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessonDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://edu-master-psi.vercel.app/lesson/${lessonId}`, {
          headers: {
            token: token
          }
        });
        setFormData(response.data.lesson);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch lesson details');
        setLoading(false);
      }
    };

    fetchLessonDetails();
  }, [lessonId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://edu-master-psi.vercel.app/lesson/${lessonId}`, formData, {
        headers: {
          token: token
        }
      });
      navigate('/lessons');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update lesson');
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://edu-master-psi.vercel.app/lesson/${lessonId}`, {
        headers: {
          token: token
        }
      });
      navigate('/lessons');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete lesson');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-lesson-container">
      <h1>Edit Lesson</h1>
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
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isPaid"
              checked={formData.isPaid}
              onChange={handleChange}
            />
            Is Paid
          </label>
        </div>
        {formData.isPaid && (
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="form-actions">
          <button type="submit" className="submit-button">Update Lesson</button>
          <button type="button" onClick={handleDelete} className="delete-button">Delete Lesson</button>
        </div>
      </form>
    </div>
  );
};

export default EditLesson;
