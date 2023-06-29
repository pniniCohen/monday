import './App.css';
import MyComponnet from './componnent/MyComponnet'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TableData from './componnent/TableData/TableData';
import Login from './componnent/Login/Login';
import React from 'react';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<MyComponnet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tableData" element={<TableData />} />
      </Routes>
    </Router>
  );
}

export default App;

