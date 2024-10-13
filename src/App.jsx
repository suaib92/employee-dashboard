import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeDetail from './components/EmployeeDetail';
import './App.css'; // Correctly import your CSS file
 // or './App.css' depending on where you imported Tailwind classes


const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employee/:id" element={<EmployeeDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
