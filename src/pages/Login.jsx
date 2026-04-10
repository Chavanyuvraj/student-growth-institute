import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Register.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const trimmedEmail = email.trim().toLowerCase();

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email: trimmedEmail, password }
      );

      const { message, user } = response.data; // ✅ get user correctly
      setMessage(message);

      if (message === "Login successful") {
        // ✅ store only user object
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ role-based navigation
        if (user.role === "admin") {
          navigate("/dashboard"); // match App.js route
        } else {
          navigate("/"); // match App.js route
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  const goToRegister = () => navigate("/register");

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Login</h2>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-register">Login</button>

        <button type="button" onClick={goToRegister} className="btn-login">
          Don't have an account? <span className="login-link-text">Register</span>
        </button>
       <p
  style={{ cursor: "pointer", color: "blue" }}
  onClick={() => navigate("/forgot-password")}
>
  Forgot Password?
</p>
        {message && (
          <p style={{ color: message.includes("successful") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}