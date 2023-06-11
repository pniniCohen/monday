import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import TableData from './TableData';
import Button from '@mui/material/Button';
import './MyComponnet.css';
import axios from 'axios';

import { useEffect, useState } from 'react';


const imageUrl = process.env.PUBLIC_URL + '/irox.png';
const teamLeader = ['חיה', 'מלכי', 'שולמית', 'ציפי'];


const MyComponnet = () => {
    const [data, setData] = useState([]);
    const [apiKey, setApiKey] = useState('');


      
const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/key');
    console.log(response.data);
    console.log("get Api key!");
    setApiKey(response.data);
    console.log(apiKey)
  } catch (error) {
    console.error("Error getting Data:", error.message);
  }
};

useEffect(() => {
  fetchData();
}, []);

useEffect(() => {
  const query = '{items_by_column_values(board_id:1493172994,column_id:"text82",column_value:"306" ){id,name  column_values(ids:[text0, __]){id text}}}';

  fetch("https://api.monday.com/v2", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': apiKey
    },
    body: JSON.stringify({
      'query': query
    })
  })
    .then(res => res.json())
    .then(res => console.log(JSON.stringify(res, null, 2)));
}, [apiKey]);

    return (
        <div>
            <img src={imageUrl} alt={`תמונה `} />
            {/* <h1>Irox!</h1> */}
            <h2>דוח שני ורביעי</h2>
            <Autocomplete className='team'
                disablePortal
                id="combo-box-demo"
                options={teamLeader}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="ראש צוות" />}
            />
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

            <TableData></TableData>

            <Button className='toSend' variant="contained">שמירה</Button>

        </div>
    );
};




export default MyComponnet;
