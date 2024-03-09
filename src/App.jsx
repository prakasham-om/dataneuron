import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './Component/App';
import Table from './Component/Table';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
