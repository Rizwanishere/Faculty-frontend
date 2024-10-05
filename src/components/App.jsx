import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Import Components */
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../utils/ScrollToTop";
import Attendance from "../pages/Attendance";
import Marks from "../pages/Marks";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/marks" element={<Marks />} />
        </Routes>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
