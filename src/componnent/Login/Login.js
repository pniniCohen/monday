import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import TableData from '../TableData/TableData.js';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './Login.css';
import dayjs from "dayjs";


const Login = () => {

  const navigate = useNavigate();
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [id, setId] = useState('');
  const [reportDate, setReportDate] = useState(new Date());

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get('reportDate');
    if (dateParam)
      setReportDate(dateParam);
      // eslint-disable-next-line
  },[]);
  
  const employee = {
    id,
    employeeNumber,
  };

  const handleClick = () => {
    if (employeeNumber.trim() === '' || id.trim() === '') {
      alert('יש למלא את כל השדות');
      
    }
    else {
      axios.post('http://localhost:3001/employeeNumber', employee)
        .then(res =>{ if(res.data.logged)
        {
          navigate('/tableData', { state: { teamLeaderName: res.data.employeeName, reportDate: reportDate } });
        } console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
    };
  }

  const handleDateChange = (date) => {
    console.log(date);
    setReportDate(new Date(date));
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {      
      console.log('Enter key pressed!');
      handleClick();
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']} >
          <DatePicker
           id="outlined-basic"
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
