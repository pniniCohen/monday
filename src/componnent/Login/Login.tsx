import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
// import TableData from '../TableData/TableData';
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
  const [result, setResult] = useState('');



  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/key');
      console.log(response.data);
      console.log("get Api key!");
      setApiKey(response.data);
      console.log(apiKey)
    } catch (error:any) {
      console.error("Error getting Data:", error.message);
    }
  };


  useEffect(() => {
    fetchData();
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get('reportDate');
  
    if (dateParam) {
      const parsedDate = new Date(dateParam);
      setReportDate(parsedDate);
    }
    // eslint-disable-next-line
  }, []);
  
  const handleClick = async () => {
    if (employeeNumber.trim() === '' || id.trim() === '') {
      alert('יש למלא את כל השדות');
      
    }
    else {
      try {
        const res = await axios.post('http://localhost/MondayWebAPI/api/Auth/login',
        {
          employeeNumber: employeeNumber,
          id: id,
        });
        console.log(JSON.stringify(res.data.token, null, 2));
        localStorage.setItem('access_token', res.data.token);
        
        navigate('/tableData', { state: { teamLeaderName: res.data.employeeName, reportDate: reportDate } });
    } catch (error) {
      alert(error);
        console.error(error);
    }
    };
  }


  const requestMonday = async (query:any) => {
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

  const handleDateChange = (date:any) => {
    console.log(date);
    setReportDate(new Date(date));
  };
  const handleKeyPress = (event:any) => {
    if (event.key === 'Enter') {      
      console.log('Enter key pressed!');
      handleClick();
    }
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
            label='תאריך דו"ח'
          />
        </DemoContainer>
      </LocalizationProvider>
      <TextField className='text' id="outlined-basic" label="מספר עובדת" autoFocus variant="outlined" onChange={(e) => { setEmployeeNumber(e.target.value) }} />
      <br></br>
      <TextField className='text' id="outlined-basic" label="תז" variant="outlined" onChange={(e) => { setId(e.target.value) }} onKeyPress={handleKeyPress} />
      <br></br>
     <Button className='login' onClick={handleClick} variant="contained">התחברות</Button>
    </div>
  );
};

export default Login;
