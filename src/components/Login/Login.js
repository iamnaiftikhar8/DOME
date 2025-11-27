import React, { useState } from 'react';
import './Login.css';
import domeLogo from '../../assets/images/dome-logo.png';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      
      console.log('Login response:', data); 

      if (response.ok && data.operation === 'success') {
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('userEmail', formData.email);
        }
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        onLogin(data.user, data.token);
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Please contact your administrator to reset your password.');
  };

  React.useEffect(() => {
    const remembered = localStorage.getItem('rememberMe');
    if (remembered === 'true') {
      const savedEmail = localStorage.getItem('userEmail');
      if (savedEmail) {
        setFormData(prev => ({ ...prev, email: savedEmail }));
        setRememberMe(true);
      }
    }
  }, []);

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header with Logo */}
        <div className="login-header">
          <img 
            src={domeLogo} 
            alt="DOME - Digital Office Management Engine" 
            className="login-logo"
          />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              disabled={isLoading}
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              disabled={isLoading}
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                disabled={isLoading}
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="forgot-password"
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`login-button ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? (
              <div className="button-content">
                <div className="spinner"></div>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;