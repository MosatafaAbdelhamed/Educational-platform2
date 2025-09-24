import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://edu-master-psi.vercel.app/question', {
          headers: {
            token: token
          }
        });
        setQuestions(response.data.questions);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch questions');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="questions-list-container">
      <h1>Questions List</h1>
      <Link to="/questions/add" className="add-question-button">Add Question</Link>
      <ul className="questions-list">
        {questions.map((question) => (
          <li key={question._id} className="question-item">
            <Link to={`/questions/${question._id}`} className="question-link">
              <h3>{question.text}</h3>
              <p>Type: {question.type}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
