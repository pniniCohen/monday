import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './MyComponnet.css';
import axios from 'axios';
import Login from './Login/Login';

import { useEffect, useState } from 'react';


const imageUrl = process.env.PUBLIC_URL + '/irox.png';


const MyComponnet = () => {
    const [data, setData] = useState([]);
    const [apiKey, setApiKey] = useState('');


      
const fetchData =  () => {
  try {
    const response =  axios.get('http://localhost:3001/key');
    console.log(response.data);
    console.log("get Api key!");
    setApiKey(response.data);
    console.log(apiKey)
  } catch (error) {
    console.error("Error getting Data:", error.message);
  }
};


useEffect(() => {

}, [apiKey]);

    return (
        <div className='login'>
           <div >
                <img src={imageUrl} alt={`תמונה `} />
                <h2>דוח שני ורביעי</h2>
            </div>
            <Login></Login>
        </div>
    );
};




export default MyComponnet;
