
import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/CourseCard.css";

export default function CourseCard({ course }) {
   const navigate = useNavigate();


  return (
    <div className="course-card">
      <h2>{course.title}</h2>
      <p className="class-range">{course.classRange}</p>

      <h4>Subjects:</h4>
      <ul>
        {course.subjects.map((sub, index) => (
          <li key={index}>{sub}</li>
        ))}
      </ul>

      <h4>Features:</h4>
      <ul>
        {course.features.map((feat, index) => (
          <li key={index}>{feat}</li>
        ))}
      </ul>

      {course.addon && (
        <p className="addon">🎯 {course.addon}</p>
      )}

     <button className="btn" onClick={() => navigate("/admission")}>
  Enroll Now
</button>
    </div>
  );
}
