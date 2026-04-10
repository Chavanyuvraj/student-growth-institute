import React from "react";

import CourseCard from "../components/CourseCard";
import "../components/CourseCard.css";

export default function Courses() {
  return (
    <div className="course-container">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
const courses = [
  {
    id: 1,
    title: "Foundation Course",
    classRange: "5th – 8th",
    subjects: [
      "Mathematics",
      "General Science",
      "English Grammar",
      "Basic Computer"
    ],
    features: [
      "Concept-based learning",
      "Simple notes & PDFs",
      "Practice worksheets",
      "Test Per week"
    ]
  },
  {
    id: 2,
    title: "SSC Target Batch",
    classRange: "9th – 10th",
    subjects: [
      "Mathematics (Algebra + Geometry)",
      "Science (Physics, Chemistry, Biology)",
      "English",
      "Social Science"
    ],
    features: [
      "Board syllabus coverage",
      "Previous year questions",
      "Test series"
    ]
  },
  {
    id: 3,
    title: "Science Pro Batch",
    classRange: "11th – 12th",
    subjects: [
      "Physics",
      "Chemistry",
      "Mathematics / Biology"
    ],
    features: [
      "Advanced concepts",
      "Mock tests",
      "Formula sheets"
    ],
    addon: "CET / NEET / JEE preparation"
  },
    {
  id: 4,
  title: "Student Development Course",
  classRange: "5th – 12th",

  subjects: [
    "Mathematics (Problem Solving & Logic Building)",
    "Science (Physics, Chemistry, Biology Basics)",
    "English (Grammar, Writing & Communication Skills)",
    "Social Studies (History, Geography & Civics)",
    "Computer Basics & Digital Skills",
    "Competitive Exam Foundation (CET / NEET / JEE Basics)"
  ],

  features: [
    "Concept-based learning",
    "Regular mock tests",
    "Doubt-solving sessions",
    "Personal guidance",
    "Complete study material",
    "Exam-focused preparation"
  ],

  addon: "CET / NEET / JEE preparation"
}
];
