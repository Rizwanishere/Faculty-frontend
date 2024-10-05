import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Import Components */
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../utils/ScrollToTop'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
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