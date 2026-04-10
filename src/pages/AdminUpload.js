import React, { useState } from "react";
import axios from "axios";

export default function AdminUpload() {
  const [classRange, setClassRange] = useState("");
  const [subject, setSubject] = useState("");
  const [pdf, setPdf] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdf || !classRange || !subject) {
      return setMessage("All fields required");
    }

    if (pdf.type !== "application/pdf") {
      return setMessage("Only PDF allowed");
    }

    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("classRange", classRange);
    formData.append("subject", subject);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/materials/upload",
        formData,
        
      
      );

      setMessage(res.data.message);

      setClassRange("");
      setSubject("");
      setPdf(null);
    } catch (err) {
      setMessage("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .upload-container {
          max-width: 400px;
          margin: 40px auto;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          background: #ffffff;
          font-family: Arial, sans-serif;
        }

        .upload-container h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .upload-container form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .upload-container select,
        .upload-container input {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
        }

        .upload-container input:focus,
        .upload-container select:focus {
          outline: none;
          border-color: #007bff;
        }

        .upload-container button {
          padding: 10px;
          border: none;
          border-radius: 6px;
          background: #007bff;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .upload-container button:hover {
          background: #0056b3;
        }

        .upload-container button:disabled {
          background: #aaa;
          cursor: not-allowed;
        }

        .message {
          text-align: center;
          margin-top: 15px;
          font-weight: bold;
          color: #333;
        }
      `}</style>

      <div className="upload-container">
        <h2>Upload Study Material</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={classRange}
            onChange={(e) => setClassRange(e.target.value)}
          >
            <option value="">Select Class</option>
            {[5,6,7,8,9,10,11,12].map((cls) => (
              <option key={cls} value={cls}>
                Class {cls}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files[0])}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>

        <p className="message">{message}</p>
      </div>
    </>
  );
}