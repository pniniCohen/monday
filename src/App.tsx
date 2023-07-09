import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
const MainLayout = lazy(() => import('./main/componnent/MyComponnet'));

function App() {


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Suspense>
  );
}

export default App;

