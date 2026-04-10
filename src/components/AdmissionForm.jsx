import React, { useState } from "react";
import axios from "axios";

const AdmissionForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    course: "",
  });
  const [errors, setErrors] = useState({});
 const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // remove error when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    if (!form.class) newErrors.class = "Class is required";

    return newErrors;
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submitting form:", form);

  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
try {
  const res = await axios.post(
    "http://localhost:5000/api/admissions",
    form
  );
console.log("Response:", res.data);

  // ✅ show success
  setSuccess("Admission submitted successfully ");

  // ✅ clear form after 1 sec
  setTimeout(() => {
    setForm({
      name: "",
      email: "",
      phone: "",
      class: "",
      course: "",
    });
    setErrors({});
  }, 1000);

  // ✅ hide success after 3 sec
  setTimeout(() => {
    setSuccess("");
  }, 6000);

} catch (err) {
  console.error("FULL ERROR:", err);
  setSuccess("");
  alert("Error submitting form");
}
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎓 Student Admission Form</h2>
     
     {success && (
  <p style={{
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
    background: "#dcfce7",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px"
  }}>
    {success}
  </p>

  )}
 

        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* NAME */}
          <div>
            <input
              style={{
                ...styles.input,
                borderColor: errors.name ? "red" : "#ccc",
              }}
              name="name"
              placeholder="Full Name *"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p style={styles.error}>{errors.name}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <input
              style={styles.input}
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* PHONE */}
          <div>
            <input
              style={{
                ...styles.input,
                borderColor: errors.phone ? "red" : "#ccc",
              }}
              name="phone"
              placeholder="Parent Phone *"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <p style={styles.error}>{errors.phone}</p>}
          </div>

          {/* CLASS */}
          <div>
            <select
              style={{
                ...styles.input,
                borderColor: errors.class ? "red" : "#ccc",
              }}
              name="class"
              value={form.class}
              onChange={handleChange}
            >
              <option value="">Select Class *</option>
              <option>5th</option>
              <option>6th</option>
              <option>7th</option>
              <option>8th</option>
              <option>9th</option>
              <option>10th</option>
              <option>11th</option>
              <option>12th</option>
            </select>
            {errors.class && <p style={styles.error}>{errors.class}</p>}
          </div>

          {/* COURSE */}
          <input
            style={styles.input}
            name="course"
            placeholder="Course (Optional)"
            value={form.course}
            onChange={handleChange}
          />

          <button type="submit" style={styles.button}>
            Submit Admission
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #0f172a, #1e293b)",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    width: "100%",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "4px",
  },
};

export default AdmissionForm;