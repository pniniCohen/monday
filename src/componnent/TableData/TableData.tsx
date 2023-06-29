import React, { useState, useEffect } from 'react';
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


const imageUrl = process.env.PUBLIC_URL + '/irox.png';
const absenceBoard = 4641194243;
let presence_options:any[] = [];

export default function TableData() {

    const { state } = useLocation();
    const [selectedDate, setSelectedDate] = useState(state.reportDate);
    const [loading, setLoading] = useState(false);
    const [tableRows, setTableRows] = useState([]);
    const handleDateChange = (date:any) => {
        console.log("date:" + date);
        setSelectedDate(date);
    };
    console.log(state.teamLeaderName);

    const [apiKey, setApiKey] = useState('');

    const fetchData = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem("access_token");

            const response = await axios.get('http://localhost/MondayWebAPI/api/Monday/loadPresenceOptions');
            console.log(response.data);
            console.log("get Api key!");
            setApiKey(response.data);
            console.log(apiKey)
        } catch (error:any) {
            console.error("Error getting Data:", error.message);
        }
    };

    useEffect(() => {
        (
            async () => {
                setLoading(true);
                await fetchData();
                console.log(apiKey);
            })();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        (
            async () => {
                if (apiKey !== '') {
                    setLoading(true);
                    // await loadPresenceOptions();
                    console.log(presence_options);
                    if (selectedDate !== null)
                        loadTeamData();
                }
            })();
        // eslint-disable-next-line
    }, [apiKey]);

    useEffect(() => {
        (
            async () => {
                console.log("selectedDate: "+ selectedDate);
                if (apiKey !== "") {
                    setLoading(true);
                    console.log("before loadTeamData:" + apiKey);
                    loadTeamData();
                }
            })();
        // eslint-disable-next-line
    }, [selectedDate]);


    //טעינת רשומות הצוות לתאריך הנבחר
    const loadTeamData = () => {
        const query = '{ items_by_column_values(board_id:' + absenceBoard + ', column_id: date4, column_value:"' + getFormattedDate(selectedDate) + '") {id column_values { id  text } } }';//title value
        console.log("query:" + query);
        requestMonday(query)
            .then(resJson => {
                // if (resJson.data !== undefined) {
                //     let filteredRows = resJson.data.items_by_column_values.filter((x: { column_values: any[]; }) => x.column_values.some((y: { id: string; text: any; }) => y.id === "dropdown" && y.text === state.teamLeaderName));
                //     setTableRows(filteredRows.map((row:any) => ({
                //         id: row.id
                //         , name: row.column_values.filter((a: { id: string; }) => a.id === "dropdown9")[0].text
                //         , presence: row.column_values.filter((a: { id: string; }) => a.id === "status")[0].text
                //         , absenceReason: row.column_values.filter((a: { id: string; }) => a.id === "text")[0].text
                //         , dirty: false
                //     })));
                //     setLoading(false);
                // }
                // else {
                //     setTableRows([]);
                // }
            })
        // .then(resJson => {
        //     console.log(JSON.stringify(resJson, null, 2));
        //     setTableRows(resJson);
        // });
    };

    const getFormattedDate = (date: string | number | Date) => {
        return new Date(date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').reverse().join('-');
    }

    const requestMonday = async (query: string) => {
        // return fetch("https://api.monday.com/v2", {
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': apiKey
        //     },
        //     body: JSON.stringify({
        //         'query': query
        //     })
        // })
        //     .then(res => res.json())
    };

    //שמירת הרשומות שנעשה בהן שינוי ל Monday
    const save = () => {
        let saved = false;
        console.log(JSON.stringify(tableRows, null, 2));
        const formattedToday = getFormattedDate(new Date());
        for (let index = 0; index < tableRows.length; index++) {
            const row:any = tableRows[index];
            if (row.dirty) {
                const query = 'mutation{change_multiple_column_values(board_id:' + absenceBoard + ', item_id:' + row.id + ',column_values: "{\\"status\\": \\"' + row.presence + '\\", \\"text\\": \\"' + row.absenceReason + '\\",\\"date\\": \\"' + formattedToday + '\\" }" ) { id }}';
                requestMonday(query)
                    .then(resJson => {
                        console.log(JSON.stringify(resJson, null, 2));
                    });
                saved = true;
                row.dirty = false;
            }
        }
        if (saved)
            alert('הנתונים נשמרו בהצלחה');
    };


    return (
        <div className='all'>
            <div>
                <img src={imageUrl} alt={`תמונה `} />
                <h1>דוח הגעה שני ורביעי</h1>
            </div>
            <h2>{state.teamLeaderName}</h2>
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
                            {tableRows.map((row:any) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right" component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        <FormControl fullWidth sx={{ minWidth:100}}>
                                            <InputLabel id="demo-simple-select-label">נוכחות</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="נוכחות"
                                                defaultValue={row.presence}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    console.log(newValue);
                                                    row.presence = newValue;
                                                    row.dirty = true;
                                                }}
                                            >
                                                {presence_options.map((option:any) => (
                                                    <MenuItem key={option.id} value={option.label}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align="center" scope="row">
                                        <TextField
                                            sx={{ width: 300 }}
                                            label="סיבת חיסור/הערות" variant="standard"
                                            defaultValue={row.absenceReason}
                                            onBlur={(e) => {
                                                const newValue = e.target.value;
                                                console.log(newValue);
                                                row.absenceReason = newValue;
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
