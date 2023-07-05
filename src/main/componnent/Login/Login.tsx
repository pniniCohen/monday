import React, { useState, useEffect, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
// import TableData from '../TableData/TableData';
import './Login.css';
import clientLoginStatus from './ClientLoginStatus';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import authService from '../../services/auth.service';
import employeeLoginData from './employeeLoginData';
import { margin } from '@mui/system';

const Login = (props:any) => {

  const navigate = useNavigate();
  const regex = /^\d*$/;
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [id, setId] = useState('');
  const [reportDate, setReportDate] = useState(new Date());
  const [errorNumber, setErrorNumber] = useState(false);
  const [errorId, setErrorId] = useState(false);


  useEffect(() => {
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
        const res = await new authService().login(new employeeLoginData({employeeNumber:Number(employeeNumber),id:id} ));
          switch (res.status) {
            case clientLoginStatus.Succeeded:
              console.log(JSON.stringify(res.token, null, 2));
              localStorage.setItem('access_token', res.token);
              localStorage.setItem('expire_time', res.expireTime);
              props.updateLoggedOut(false);
              axios.defaults.headers.common['Authorization'] = localStorage.getItem("access_token");            
              navigate('/tableData', { state: { teamLeaderName: res.employeeName, reportDate: reportDate } });
              break;
           default:
              alert('Invalid login!');
              //setErrMsg(response);
              break;
          }
      } catch (error) {
        alert(error);
        console.error(error);
      }
    };
  }

  const handleDateChange = (date: any) => {
    console.log(date);
    setReportDate(new Date(date));
  };

  const handleInputNumChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    if (!regex.test(input)) {
      setErrorNumber(true);
    }
    else {
      setErrorNumber(false);
      setEmployeeNumber(input);
    }
  };

  const handleInputIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    if (!regex.test(input)) {
      setErrorId(true);
    }
    else {
      setErrorId(false);
      setId(input);
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed!');
      handleClick();
    }
  };


  return (
    <div>
      {/* <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} > */}
        <LocalizationProvider dateAdapter={AdapterDayjs} >
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
      {/* </div> */}
      <TextField className='text' id="outlined-basic" label="מספר עובדת" autoFocus variant="outlined" onChange={handleInputNumChange} />
      {errorNumber && <p style={{ color: 'red' }}>קלט לא חוקי: מספר עובדת מכיל רק מספרים</p>}
      <br></br>
      <TextField className='text' id="outlined-basic" label="תז" variant="outlined" onChange={handleInputIdChange} onKeyPress={handleKeyPress} />
      {errorId && <p style={{ color: 'red' }}>קלט לא חוקי: ת"ז מכילה רק מספרים</p>}
      <br></br>
      <Button className='login' onClick={handleClick} variant="contained">התחברות</Button>
    </div>
  );
};

export default Login;
