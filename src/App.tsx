import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeID from './pages/HomeID';
import HomeEN from './pages/HomeEN';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeID />} />
        <Route path="/en" element={<HomeEN />} />
      </Routes>
    </>
  );
}
