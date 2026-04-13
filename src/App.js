import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { AdminRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminUpload from "./pages/AdminUpload";
import Courses from "./pages/Courses";
import SubjectMaterial from "./pages/SubjectMaterial";
import StudyMaterials from "./pages/StudyMaterials";
import AdmissionForm from "./components/AdmissionForm";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (<>
    <h1>Hello world</h1>
  <BrowserRouter >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/materials" element={<StudyMaterials />} />
        <Route path="/materials/:classRange/:subject" element={<SubjectMaterial />} />


        <Route path="/courses" element={<Courses />} />
        <Route path="/admin/upload" element={<AdminUpload />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admission" element={<AdmissionForm />} />
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
