import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
  if (user?.role === "admin") {
    navigate("/dashboard");
  }
}, [user, navigate]);
  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Welcome to Student Growth Institute 🎓</h1>
        <p>Learn Smart. Score High. Grow Confident!</p>
        <span>For Classes 5th to 12th Students</span>
        <div className="hero-buttons">
          {/* Show Register button only if user is not registered/logged-in */}
          {!user && (
            <button className="btn" onClick={() => navigate("/register")}>
              Join Now
            </button>
          )}
          <button className="btn secondary" onClick={() => navigate("/courses")}>
            View Courses
          </button>
        </div>
      </section>

      {/* OFFER SECTION */}
      <section className="offer">
        <h2>What We Offer</h2>
        <div className="offer-cards">
          <div className="card">5th–8th → Basics Strong</div>
          <div className="card">9th–10th → Board Preparation</div>
          <div className="card">11th–12th → Career Focus</div>
        </div>
      </section>

      {/* SUBJECTS SECTION */}
      <section className="subjects">
        <h2>Subjects</h2>
        <div className="subject-list">
          <div>📐 Maths</div>
          <div>🔬 Science</div>
          <div>📖 English</div>
          <div>🌍 Social Studies</div>
          <div>💻 Computer</div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why">
        <h2>Why Choose Us</h2>
        <ul>
          <li>👨‍🏫 Experienced Teachers</li>
          <li>📖 Easy Teaching Method</li>
          <li>📝 Regular Tests</li>
          <li>📊 Progress Tracking</li>
          <li>🎯 Board Exam Preparation</li>
        </ul>
      </section>

      {/* STUDENT BENEFITS */}
      <section className="benefits">
        <h2>Student Benefits</h2>
        <ul>
          <li>✔️ Doubt Solving</li>
          <li>✔️ Fun Learning</li>
          <li>✔️ Weekly Tests</li>
          <li>✔️ Personal Attention</li>
          <li>✔️ Confidence Building</li>
        </ul>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="results">
        <h2>Our Achievements</h2>
        <div className="result-cards">
          <div>🏆 1000+ Students</div>
          <div>🥇 Top Board Results</div>
          <div>📈 Performance Growth</div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>What Students Say</h2>
        <p>"My marks improved from 60% to 85%!" – Student</p>
        <p>"Best coaching for my child." – Parent</p>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta">
        <h2>Admissions Open Now!</h2>
        <p>Give Your Child a Bright Future 🌟</p>
        {!user && (
          <button className="btn" onClick={() => navigate("/admission")}>
            Enroll Today
          </button>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h3>Contact Us</h3>
        <p>📞 +91 9370587733</p>
        <p><FaEnvelope /> adityashinde4061@gmail.com</p>
        <p>📍 AT, POST - Tembhurni, Tal - Madha, Dist - Solapur</p>
        <div className="social-icons">
          <a href="https://instagram.com/students_growth_institute" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={25} />
          </a>
          <a href="https://wa.me/919370587733" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={25} />
          </a>
          <a href="mailto:adityashinde4061@gmail.com">
            <FaEnvelope size={25} />
          </a>
        </div>
      </footer>

    </div>
  );
};

export default Home;