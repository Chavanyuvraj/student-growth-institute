import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API =  process.env.REACT_APP_API_URL;

      const response = await axios.post(
        `${API}/api/auth/register`,
        { name, email, password }
      );


      setMessage(response.data.message);


      if (response.data.message === "Registration successful") {
        localStorage.setItem("user", JSON.stringify(response. data.user ));
        navigate("/");
      }

    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  const goToLogin = () => navigate("/login");

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <div><label>Name:</label><input type="text" value={name} onChange={e => setName(e.target.value)} required /></div>
        <div><label>Email:</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
        <div><label>Password:</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
        <button type="submit" className="btn-register">Register</button>
        <button type="button" onClick={goToLogin} className="btn-login">
          Already have an account? <span className="login-link-text">Login</span>
        </button>

        {message && <p style={{ color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
      </form>
    </div>
  );
}

export default Register;