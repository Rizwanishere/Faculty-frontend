import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BranchSelection from '../pages/BranchSelection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import Attendance from '../pages/Attendance';
import MarksEntry from '../pages/Marks';
// import Reports from './Reports';

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
        <Route path="/marks-entry" element={<MarksEntry />} />
        {/* <Route path="/reports" element={<Reports />} /> */}

        {/* Redirect any unknown path to the root (Branch Selection) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
