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
  const [reportDate, setReportDate] = useState(new Date());

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get('reportDate');
    if (dateParam) {
      const parsedDate = new Date(dateParam);
      setReportDate(parsedDate);
    }
    // eslint-disable-next-line
  }, []);

  const employee = {
    employeeNumber,
    id,
  };

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
        if (res.data.status == 0)//clientLoginStatus.Succeeded)
         { alert("יופי!!!");
        //switch (res.data.status) {
         // case clientLoginStatus.Succeeded:
            console.log(JSON.stringify(res.data.token, null, 2));
            localStorage.setItem('access_token', res.data.token);
            navigate('/tableData', { state: { teamLeaderName: res.data.employeeName, reportDate: reportDate } });
            //break;
         // default:
        }
        else
        {
            alert('Invalid login!');
            //setErrMsg(response);
           // break;
        }
      } catch (error) {
        alert(error);
        console.error(error);
      }
    };
  }

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
        <DemoContainer components={['DatePicker']} >
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

