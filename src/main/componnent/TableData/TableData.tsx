import React, { useState, useEffect } from 'react';
import tableDataService from "../../services/tableData.service";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import './TableData.css';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs from "dayjs";
import { BoxLoading } from 'react-loadingg';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import presenceRowData from './presenceRowData';
//import { useNavigate } from 'react-router-dom';
//import authService from '../../services/auth.service';
//import store from '../../redux/store';
//import { decrement } from '../../redux/action';

//const imageUrl = process.env.PUBLIC_URL + '/irox.png';
//const absenceBoard = 4641194243;
let presence_options: any[] = [];

export default function TableData() {

    //const navigate = useNavigate();
    const {state} = useLocation();
    const [selectedDate, setSelectedDate] = useState(state?.reportDate);
    const [loading, setLoading] = useState(false);
    const [tableRows, setTableRows] = useState<presenceRowData[]>([]);
    const [expire_time, setExpire_time] = useState(0);

    const handleDateChange = (date: any) => {
        console.log("date:" + date);
        setSelectedDate(date);
    };


    const fetchData = async () => {
        try {
            setExpire_time(Number(localStorage.getItem("expire_time")));
            const response = await new tableDataService().loadPresenceOptions();
            if (response.errorMessage) {
                alert(response.errorMessage);
                //messageRef.current?.show(MessageSeverity.error, t('message.error'), response.errorMessage);
            }
            else {
                presence_options = response.presenceOptions;
            }
            console.log(response);
            console.log(presence_options);
        } catch (error: any) {
            console.error("Error getting Data:", error.message);
        }
    };

    const loadEmployeesByTeamAndDate = async () => {

        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("access_token");
            const response = await new tableDataService().getTeamData(selectedDate);
            console.log(response);
            setTableRows(response);
            setLoading(false);
        } catch (error: any) {
            console.error("Error getting Data:", error.message);
        }
    };


    // useEffect(() => {
    //   const intervalId = setInterval(() => {
    //     // store.dispatch(decrement());
    //     // //console.log("set interval every 1 minute");
    //     // const count = store.getState().counter;
    //     // console.log(count);
    //     // if (count === 0) {
    //       navigate('/login');
    //     //}
    //   }, 60000);

    //   return () => {
    //     clearInterval(intervalId); // Cleanup the interval on component unmount
    //   };
    // },[]);

    useEffect(() => {
        (
            async () => {
                setLoading(true);
                await fetchData();
                //loadEmployeesByTeamAndDate();
            })();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        (
            async () => {
                console.log("selectedDate: " + selectedDate);
                setLoading(true);
                loadEmployeesByTeamAndDate();
            })();
        // eslint-disable-next-line
    }, [selectedDate]);

    //שמירת הרשומות שנעשה בהן שינוי ל Monday
    const save = async () => {
        if (tableRows.some(x => x.dirty == true)) {
            let saved = false;
            console.log(JSON.stringify(tableRows, null, 2));
            saved = await new tableDataService().update(tableRows);
            if (saved == true) {
                tableRows.forEach(x => x.dirty = false);
                alert('הנתונים נשמרו בהצלחה');
            }
            else
            {
                alert('שמירה נכשלה');
            }
        }
    };


    return (
        <div className='all' >
            <h2>{state?.teamLeaderName}</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        className="dateCheck"
                        onChange={handleDateChange}
                        label='תאריך דו"ח'
                        defaultValue={dayjs(selectedDate)}
                    />
                </DemoContainer>
            </LocalizationProvider>
            {loading ? <BoxLoading /> :
                <div><TableContainer component={Paper} className='table'>
                    <Table dir="rtl" sx={{ minWidth: 50 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">שם</TableCell>
                                <TableCell align="center">נוכחות</TableCell>
                                <TableCell className='three' align="center">סיבת חיסור/הערות</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableRows && tableRows.map((row: presenceRowData) => (
                                <TableRow
                                    key={row.pulseId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right" component="th" scope="row">
                                        {row.employeeName}
                                    </TableCell>
                                    <TableCell align="center">
                                        <FormControl fullWidth sx={{ minWidth: 100 }}>
                                            <InputLabel id="demo-simple-select-label">נוכחות</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="נוכחות"
                                                defaultValue={row.statusPresence}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    console.log(newValue);
                                                    row.statusPresence = newValue;
                                                    row.dirty = true;
                                                }}
                                            >
                                                {presence_options.map((option: any) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align="center" scope="row">
                                        <TextField
                                            sx={{ width: 300 }}
                                            label="סיבת חיסור/הערות" variant="standard"
                                            defaultValue={row.reason}
                                            onBlur={(e) => {
                                                const newValue = e.target.value;
                                                console.log(newValue);
                                                row.reason = newValue;
                                                row.dirty = true;
                                            }}
                                        >
                                        </TextField>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <Button className='toSend' onClick={save} variant="contained">שמירה</Button>
                </div>}
        </div>
    );
}
