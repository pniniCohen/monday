import './App.css';
//import MyComponnet from './main/componnent/MyComponnet'//MainLayout
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import TableData from './main/componnent/TableData/TableData';
//import Login from './main/componnent/Login/Login';
//import React, { useEffect } from 'react';
import React, { lazy, Suspense } from 'react';
//import { Provider } from 'react-redux';
//import store from './redux/store';
const MainLayout = lazy(() => import('./main/componnent/MyComponnet'));

function App() {
 
 
  return (
    // store={store}>
    // <Provider>
      // <Router>
      //   <Routes>
      //     <Route path="" element={<MyComponnet />} />
      //     <Route path="/login" element={<Login />} />
      //     <Route path="/tableData" element={<TableData />} />
      //   </Routes>
      // </Router>
    //</Provider>
    <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/*" element={<MainLayout />} />
          </Routes>
        </Suspense>
  );
}


export default App;

