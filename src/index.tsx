import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
//import { Provider } from 'react-redux';
//import { store } from './app/store/store';

ReactDOM.render(
  // <React.StrictMode> 
  //<Provider store={store}>
  //<ScrollToTop>
  <BrowserRouter>
    <App />
  </BrowserRouter>, 
  // </ScrollToTop>
  // </Provider>
  // </React.StrictMode>
  document.getElementById('root')
);

reportWebVitals();




// // index.js

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));
