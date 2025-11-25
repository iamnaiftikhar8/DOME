import React, { useState } from 'react';
import './Login.css';

// Import the logo image
import domeLogo from '../../assets/images/dome-logo.png';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  // Dummy credentials
  const dummyCredentials = {
    email: 'admin@dome.com',
    password: 'password123'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check dummy credentials
      if (formData.email === dummyCredentials.email && formData.password === dummyCredentials.password) {
        // Login successful
        if (rememberMe) {
          // Save to localStorage if remember me is checked
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('userEmail', formData.email);
        }
        onLogin(); // Call the parent function to switch to Home page
      } else {
        setError('Invalid email or password. Use: admin@dome.com / password123');
      }
      
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would go here!\n\nDummy Credentials:\nEmail: admin@dome.com\nPassword: password123');
  };

  // Check if remember me was previously set
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