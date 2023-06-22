import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import './Login.css';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";


const Login = () => {

  const navigate = useNavigate();
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [id, setId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [reportDate, setReportDate] = useState(new Date());



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
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get('reportDate');
    if (dateParam)
      setReportDate(dateParam);
      // eslint-disable-next-line
  },[]);

  const handleClick = () => {
    if (employeeNumber.trim() === '' || id.trim() === '') {
      alert('יש למלא את כל השדות');
    }
    else {
      console.log(employeeNumber);
      const query = '{items_by_column_values(board_id:1493172994,column_id:"text82",column_value:"' + employeeNumber + '" ){id,name column_values(ids:[text0, __]){id text}}}';
      console.log(query);
      requestMonday(query)
        .then(resJson => {
          console.log(JSON.stringify(resJson, null, 2));
          if (//temp removed : resJson.data.items_by_column_values.some(x => x.column_values.some(y=> y.id ==="text0" && y.text === id)) &&
            resJson.data.items_by_column_values.some(x => x.column_values.some(y => y.id === "__" && (y.text === "רכזת" || y.text === "ראש צוות"))))//;
          {
            navigate('/tableData', { state: { teamLeaderName: resJson.data.items_by_column_values[0].name, reportDate: reportDate } });
          }
          else {
            alert('לא נמצאו נתונים מתאימים');
            return
          }
        });
    }
  }

  const requestMonday = async (query) => {
    return fetch("https://api.monday.com/v2", {
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
  };

  const handleDateChange = (date) => {
    console.log(date);
    setReportDate(new Date(date));
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            className="dateCheck"
            defaultValue={dayjs(reportDate)}
            onChange={handleDateChange}
            value={dayjs(reportDate)}
            // startDate={reportDate}
            label='תאריך דו"ח'
          />
        </DemoContainer>
      </LocalizationProvider>
      <TextField className='text' id="outlined-basic" label="מספר עובדת" variant="outlined" onChange={(e) => { setEmployeeNumber(e.target.value) }} />
      <br></br>
      <TextField className='text' id="outlined-basic" label="תז" variant="outlined" onChange={(e) => { setId(e.target.value) }} onKeyDown={e => e.key === 'Enter' ? handleClick: 
''} />
      <br></br>
     <Button className='login' onClick={handleClick} variant="contained">התחברות</Button>
    </div>
  );
};

export default Login;
