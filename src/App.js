// import logo from './logo.svg';
// import './App.css';
// import MyComponnet from './componnent/MyComponnet'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import TableData from './componnent/TableData/TableData';
// import Login from './componnent/Login/Login';


// function App() {
//   return (
//     <div className="App">
//       <MyComponnet></MyComponnet>
//     </div>
//     // <Router>
//     //   <Routes>
//     //     <Route path="" component={MyComponnet} />
//     //     <Route path="/login" component={Login} />
//     //     <Route path="/tableData" component={TableData} />
//     //   </Routes>
//     // </Router>
//   );
// }


// export default App;





import logo from './logo.svg';
import './App.css';
import MyComponnet from './componnent/MyComponnet'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TableData from './componnent/TableData/TableData';
import Login from './componnent/Login/Login';


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