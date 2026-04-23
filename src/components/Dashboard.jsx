import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [admissions, setAdmissions] = useState([]);
  const [showAdmissions, setShowAdmissions] = useState(false);

  const fetchAdmissions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admissions");
      const data = await res.json();
      setAdmissions(data);
    } catch (err) {
      console.error("Error fetching admissions:", err);
    }
  };

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    if (showAdmissions) fetchAdmissions();
  }, [user, navigate, showAdmissions]);

  const approve = async (id) => {
    await fetch(`http://localhost:5000/api/admissions/approve/${id}`, { method: "PUT" });
    fetchAdmissions();
  };

  const reject = async (id) => {
    await fetch(`http://localhost:5000/api/admissions/reject/${id}`, { method: "PUT" });
    fetchAdmissions();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Admin Panel</h2>
        <ul style={styles.sidebarList}>
          <li style={styles.sidebarItem}>📊 Dashboard</li>
          <li style={styles.sidebarItem}>🎓 Manage Courses</li>
          <button onClick={() => navigate("/admin/upload")} style={styles.sidebarButton}>
            Upload Study Material
          </button>
          <li>
            <button onClick={() => setShowAdmissions(prev => !prev)} style={styles.sidebarButton}>
              👨‍🎓 Students
            </button>
          </li>
          <li style={styles.sidebarItem}>⚙️ Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <div style={styles.header}>
          <h1>Welcome Admin 👑</h1>
          <p style={styles.userEmail}>{user?.email}</p>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>

        {/* Stats */}
        <div style={styles.statsContainer}>
          <div style={styles.card}>
            <h3>Total Admissions</h3>
            <p>{admissions.length}</p>
          </div>
          <div style={styles.card}>
            <h3>Approved</h3>
            <p>{admissions.filter(a => a.status === "approved").length}</p>
          </div>
          <div style={styles.card}>
            <h3>Pending</h3>
            <p>{admissions.filter(a => a.status === "pending").length}</p>
          </div>
        </div>

        {/* Admissions Table */}
        {showAdmissions && (
          <div style={{ marginTop: "30px" }}>
            <h2>Admission Requests</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {admissions.map(a => (
                  <tr key={a._id}>
                    <td>{a.name}</td>
                    <td>{a.phone}</td>
                    <td>{a.class}</td>
                    <td style={{ ...styles.status, color: a.status === "approved" ? "green" : a.status === "rejected" ? "red" : "orange" }}>
                      {a.status}
                    </td>
                    <td>
                      {a.status === "pending" && (
                        <div style={styles.actionButtons}>
                          <button style={styles.approveBtn} onClick={() => approve(a._id)}>Approve</button>
                          <button style={styles.rejectBtn} onClick={() => reject(a._id)}>Reject</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ Styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif"
  },
  sidebar: {
    width: "250px",
    background: "#1e293b",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column"
  },
  sidebarTitle: {
    marginBottom: "30px",
    fontSize: "22px"
  },
  sidebarList: {
    listStyle: "none",
    padding: 0
  },
  sidebarItem: {
    marginBottom: "15px",
    cursor: "pointer"
  },
  sidebarButton: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    background: "#2563eb",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.2s",
  },
  main: {
    flex: 1, padding: "30px",
    background: "#f8fafc",
    overflowY: "auto"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  userEmail: { color: "#334155" },
  logoutBtn: {
    padding: "8px 16px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.2s",
  },
  statsContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px"
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    flex: 1,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
    background: "#fff", borderRadius: "8px", overflow: "hidden"
  },
  status: { fontWeight: "bold" },
  actionButtons: {
    display: "flex",
    gap: "10px"
  },
  approveBtn: {
    padding: "6px 12px",
    background: "green", color: "white", border: "none", borderRadius: "4px", cursor: "pointer"
  },
  rejectBtn: {
    padding: "6px 12px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
};

export default Dashboard;
