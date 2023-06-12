import React, { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import TableData from '../TableData/TableData';
import './Login.css';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


const Login = () => {

const[employeeNumber,setEmployeeNumber]=useState('');
const[id,setId]=useState('');

const navigate = useNavigate();

const handleClick=()=>{
    if (employeeNumber.trim() === '' || id.trim() === '') {
        alert('יש למלא את כל השדות');
      } else {
        navigate('/tableData',{state:{nameTeam:employeeNumber}});
      }
}


    return (
        <div>
            <TextField className='text' id="outlined-basic" label="מספר עובדת" variant="outlined" onChange={(e)=>{setEmployeeNumber(e.target.value)}} />
            <br></br>
            <TextField className='text' id="outlined-basic" label="תז" variant="outlined" onChange={(e)=>{setId(e.target.value)}} />
            <br></br>
            <Button className='login' onClick={handleClick} variant="contained">התחברות</Button>

        </div>
    );

};

export default Login;
