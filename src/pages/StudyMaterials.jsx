import React from "react";
import { Link } from "react-router-dom";

const studyMaterials = {
  "5th Class": ["Maths", "Science", "English", "History", "Computer"],
  "6th Class": ["Maths", "Science", "English", "History", "Computer"],
  "7th Class": ["Maths", "Science", "English", "History", "Computer"],
  "8th Class": ["Maths", "Science", "English", "History", "Computer"],
  "9th Class": ["Maths", "Physics", "Chemistry", "Biology", "Computer"],
  "10th Class": ["Maths", "Physics", "Chemistry", "Biology", "Computer"],
  "11th Class": ["Maths", "Physics", "Chemistry", "Biology", "Computer"],
  "12th Class": ["Maths", "Physics", "Chemistry", "Biology", "Computer"]
};

export default function StudyMaterials() {
  return (
    <div>
      <style>{`
        .container { padding: 30px; font-family: Arial, sans-serif; }
        .title { text-align: center; margin-bottom: 30px; font-size: 28px; color: #1e293b; }
        .card { background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); }
        .range { font-size: 20px; margin-bottom: 10px; color: #334155; }
        .list { list-style: none; padding: 0; }
        .item { margin-bottom: 10px; }
        .link { display: inline-block; text-decoration: none; color: white; background: #3b82f6; padding: 8px 16px; border-radius: 8px; transition: 0.3s; }
        .link:hover { background: #2563eb; }
      `}</style>

      <div className="container">
        <h2 className="title">Study Materials</h2>

        {Object.keys(studyMaterials).map((range) => {
          const grade = range.split(" ")[0].replace(/\D/g, ""); 
          return (
            <div key={range} className="card">
              <h3 className="range">{range}</h3> 
              <ul className="list">
                {studyMaterials[range].map((subject, i) => (
                  <li key={i} className="item">
                    <Link
                      to={`/materials/${grade}/${subject.toLowerCase()}`} 
                      className="link"
                    >
                      {subject.charAt(0).toUpperCase() + subject.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}