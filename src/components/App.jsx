import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/* Import Components */
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import BranchSelection from '../pages/BranchSelection';
import ScrollToTop from "../utils/ScrollToTop";
import Attendance from "../pages/Attendance";
import Marks from "../pages/Marks";

const App = () => {
  const selectedBranch = localStorage.getItem('selectedBranch'); // Check if branch is selected
  return (
    <Router>
      <Header />
      <Routes>
        {/* If no branch selected, show BranchSelection as the default route */}
        <Route path="/" element={selectedBranch ? <Navigate to="/home" /> : <BranchSelection />} />
        
        {/* Route to Home after branch selection */}
        <Route path="/home" element={<Home />} />

        {/* Nested routes for Attendance, MarksEntry, and Reports */}
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/marks" element={<Marks />} />

        {/* Redirect any unknown path to the root (Branch Selection) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </Router>
  );
};

export default App;
