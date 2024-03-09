import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from './Component/App';
import Table from './Component/Table';

function AppRouter() {
  return (
    <Router>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white font-semibold">Home</Link>
          <Link to="/table" className="text-white font-semibold">Task2</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
