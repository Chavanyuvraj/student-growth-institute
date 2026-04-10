import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { email, newPassword }
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <style>
        {`
          .reset-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 80vh;
            background: #f5f7fa;
          }

          .reset-box {
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            width: 320px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            text-align: center;
          }

          .reset-box h2 {
            margin-bottom: 20px;
            color: #333;
          }

          .reset-box input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 14px;
          }

          .reset-box input:focus {
            border-color: #007bff;
            outline: none;
          }

          .reset-box button {
            width: 100%;
            padding: 10px;
            background: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 10px;
          }

          .reset-box button:hover {
            background: #0056b3;
          }

          .message {
            margin-top: 15px;
            font-size: 14px;
          }

          .success {
            color: green;
          }

          .error {
            color: red;
          }

          @media (max-width: 480px) {
            .reset-box {
              width: 90%;
              padding: 20px;
            }
          }
        `}
      </style>

      <div className="reset-container">
        <div className="reset-box">
          <h2>Reset Password</h2>

          <form onSubmit={handleReset}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <button type="submit">Reset Password</button>
          </form>

          {message && (
            <p className={`message ${message.includes("success") ? "success" : "error"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}