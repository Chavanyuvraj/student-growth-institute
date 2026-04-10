import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SubjectMaterial() {
  const { classRange, subject } = useParams();
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, [classRange, subject]);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/materials/${classRange}/${subject}`
      );
      setMaterials(res.data);
    } catch (err) {
      console.error("Error fetching materials", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        Class {classRange} - {subject}
      </h1>

      {materials.length === 0 ? (
        <p>No materials available</p>
      ) : (
        <ul>
          {materials.map((item) => (
            <li key={item._id}>
              <a
      href={`http://localhost:5000${item.fileUrl}`}
      target="_blank"
      rel="noreferrer"
    >
      {item.subject} PDF
    </a>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}