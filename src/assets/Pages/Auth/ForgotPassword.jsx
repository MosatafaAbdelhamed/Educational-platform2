import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://edu-master-psi.vercel.app/user/forgot-password', { email });
      setMessage(response.data.message || 'OTP has been sent to your email.');
      setError('');
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP.');
      setMessage('');
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Send OTP</button>
      </form>
      <p className="redirect-link">
        Remember your password? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
