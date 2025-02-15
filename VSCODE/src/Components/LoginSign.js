import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './loginsignup.css';

function LoginSign() {
  const [action, setAction] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerLink = () => setAction('active');
  const loginLink = () => setAction('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === 'active') {
        // Registration Logic
        if (formData.password !== formData.confirmPassword) {
          setErrorMessage("Passwords don't match");
          return;
        }
  
        const response = await axios.post('http://localhost:8080/api/register', {
          name: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
  
        setSuccessMessage(response.data);
        setErrorMessage('');
        alert('Registration successful');
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: '',
        });
      } else {
        // Login Logic
        const response = await axios.post('http://localhost:8080/api/login', {
          email: formData.email,
          password: formData.password,
        });
  
        setSuccessMessage(response.data.message); // Show the success message from the backend
        setErrorMessage('');
  
        // Store email and ID in localStorage after successful login
        if (response.data && response.data.message.includes('Admin')) {
          localStorage.setItem('email', formData.email);
          localStorage.setItem('id', response.data.id);
          navigate('/admin-dashboard');
        } else if (response.data && response.data.message.includes('Consumer')) {
          localStorage.setItem('email', formData.email);
          localStorage.setItem('id', response.data.id);
          navigate('/consumer-dashboard');
        } else if (response.data && response.data.message.includes('Farmer')) {
          localStorage.setItem('email', formData.email);
          localStorage.setItem('id', response.data.id);
          navigate('/farmer-dashboard');
        } else {
          setErrorMessage('Invalid response from the server');
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data || 'An error occurred');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className={`wrapper ${action}`}>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          {/* Login Form */}
          <div className={`form-box login ${action === '' ? 'active' : ''}`}>
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="remember-forget">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="/forgotpassword">Forgot password?</a>
              </div>
              <button type="submit">Login</button>
              <div className="register">
                <p>
                  Don't have an account?{' '}
                  <span onClick={registerLink} className="link">
                    Register
                  </span>
                </p>
              </div>
            </form>
          </div>

          {/* Registration Form */}
          <div className={`form-box register ${action === 'active' ? 'active' : ''}`}>
            <form onSubmit={handleSubmit}>
              <h1>Registration</h1>
              <div className="input-box">
                <label className="radio">
                  <input
                    type="radio"
                    name="role"
                    value="Farmer"
                    checked={formData.role === 'Farmer'}
                    onChange={handleInputChange}
                    required
                  />
                  Farmer
                </label>

                <label className="radio">
                  <input
                    type="radio"
                    name="role"
                    value="Consumer"
                    checked={formData.role === 'Consumer'}
                    onChange={handleInputChange}
                    required
                  />
                  Consumer
                </label>
              </div>

              <div className="input-box">
                <input
                  type="text"
                  name="username"
                  placeholder="Name"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>

              <div className="remember-forget">
                <label>
                  <input
                    type="checkbox"
                    onClick={() => setShowPopup(true)}
                  />{' '}
                  I agree to the terms & conditions
                </label>
              </div>

              <button type="submit">Register</button>
              <p>
                Already have an account?{' '}
                <span onClick={loginLink} className="link">
                  Login
                </span>
              </p>
            </form>
          </div>

          {/* Terms & Conditions Popup */}
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <p>
                  If the species is not good enough to use, then farmers will have to pay
                  compensation. Unless they have to define every detail about the quality of their products.
                </p>
                <button onClick={() => setShowPopup(false)}>Agree</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginSign;
