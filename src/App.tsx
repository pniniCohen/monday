import './App.css';
import MyComponnet from './componnent/MyComponnet'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TableData from './componnent/TableData/TableData';
import Login from './componnent/Login/Login';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';


function App() {


  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="" element={<MyComponnet />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tableData" element={<TableData />} />
        </Routes>
      </Router>
    </Provider>
  );
}


export default App;

