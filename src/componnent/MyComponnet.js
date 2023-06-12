import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './MyComponnet.css';
import axios from 'axios';
import Login from './Login/Login';

import { useEffect, useState } from 'react';


const imageUrl = process.env.PUBLIC_URL + '/irox.png';
const teamLeader = ['חיה', 'מלכי', 'שולמית', 'ציפי'];


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

// useEffect(() => {
//   fetchData();
//   const query = '{items_by_column_values(board_id:1493172994,column_id:"text82",column_value:"306" ){id,name  column_values(ids:[text0, __]){id text}}}';

//   fetch("https://api.monday.com/v2", {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': apiKey
//     },
//     body: JSON.stringify({
//       'query': query
//     })
//   })
//     .then(res => res.json())
//     .then(res => console.log(JSON.stringify(res, null, 2)));
// }, []);

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
