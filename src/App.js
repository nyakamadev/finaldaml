import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Overview from "./pages/Overview";
import Enroll from "./pages/Enroll";
import BusinessSolution from "./pages/BusinessSolution";
import Blog from "./pages/Blog";
import Faq from "./pages/Faq";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/business-solution" element={<BusinessSolution />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;