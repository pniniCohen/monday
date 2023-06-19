//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './TableData.css';
import Button from '@mui/material/Button';
import { Await, useLocation } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { green } from '@mui/material/colors';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const imageUrl = process.env.PUBLIC_URL + '/irox.png';
const absenceBoard = 4641194243;//temp duplicate2 Board  3717736532;

// const presence_options = ['הגיעה','יום רביעי - חוץ לעיר', 'חסרה עם אישור', 'חסרה ללא אישור', 'לא עובדת היום'];
let presence_options=[];

export default function TableData() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tableRows, setTableRows] = useState([]);
    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
    };

    const { state } = useLocation();
    console.log(state.teamLeaderName);

    const [apiKey, setApiKey] = useState('');
    const [temp_presence_options, setTempOptions] = useState([]);

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
        (
            async () => {
                await fetchData();
                console.log(apiKey);
            })();
    }, []);

    // useEffect(() => {
    //     (
    //         async () => {
    //             await loadPresenceOptions();
    //             console.log(presence_options);
    //         })();
    // }, [apiKey]);

    useEffect(() => {
        (
            async () => {
                console.log(selectedDate);
                if (apiKey != "") {
                    console.log("before loadTeamData:" + apiKey);
                    loadTeamData();
                    loadPresenceOptions();
                }
            })();
    }, [selectedDate]);

    const loadPresenceOptions = async () => {
        
        const query = '{ boards (ids:' + absenceBoard + ') { columns(ids:[status]) { title settings_str } } }'
        console.log("!!loadPresenceOptions query:" + query);
        requestMonday(query)
             .then(resJson => {
                let options = [];
                if (resJson.data !== undefined) {
                    let labels = JSON.parse(resJson.data.boards[0].columns[0].settings_str).labels;
                    console.log("labels:" + JSON.stringify(labels, null, 2));
                     presence_options = Object.entries(labels).map(([key, value]) => ({
                        id: key,
                        label: value
                      }));
                      
                      console.log(presence_options);
                }

                return resJson;
            })
            .then(resJson => {
                console.log(JSON.stringify(resJson, null, 2));
                //setTableRows(resJson);
            });
  
       
    };

    const loadTeamData = () => {
        const query = '{ items_by_column_values(board_id:' + absenceBoard + ', column_id: date4, column_value:"' + getFormattedDate(selectedDate) + '") {id column_values { id title value text } } }';
        console.log("query:" + query);
        requestMonday(query)
            .then(resJson => {
                let newRows = [];
                if (resJson.data !== undefined) {
                    let filteredRows = resJson.data.items_by_column_values.filter(x => x.column_values.some(y => y.id == "dropdown" && y.text == state.teamLeaderName));
                    console.log("filteredRows:" + JSON.stringify(filteredRows, null, 2));

                    filteredRows.forEach((element) => {
                        newRows.push({
                            id: element.id
                            , name: element.column_values.filter(a => a.id == "dropdown9")[0].text
                            , presence: element.column_values.filter(a => a.id == "status")[0].text
                            , absenceReason: element.column_values.filter(a => a.id == "text")[0].text
                        });
                    });
                }

                return newRows;
            })
            .then(resJson => {
                console.log(JSON.stringify(resJson, null, 2));
                setTableRows(resJson);
            });
    };

    const getFormattedDate = (date)=>
    {
        return new Date(date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').reverse().join('-');
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

    const save = () => {
        console.log(JSON.stringify(tableRows, null, 2));
        const formattedToday = getFormattedDate(new Date());
         for (let index = 0; index < tableRows.length; index++) {
            const row = tableRows[index];
            const query = //'mutation { change_simple_column_value(item_id:'+row.id+', board_id:'+absenceBoard+', column_id: "status", value: "'+ row.presence +'", create_labels_if_missing: true) { id } }'
                          'mutation{change_multiple_column_values(board_id:'+absenceBoard+', item_id:'+row.id+',column_values: "{\\"status\\": \\"'+ row.presence +'\\", \\"text\\": \\"'+ row.absenceReason +'\\",\\"date\\": \\"'+ formattedToday +'\\" }" ) { id }}';
            requestMonday(query)
                .then(resJson => {
                    console.log(JSON.stringify(resJson, null, 2));
                });
    
        }
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
                        //defaultValue={selectedDate}
                        onChange={handleDateChange}
                        startDate={selectedDate}
                        label='תאריך דו"ח'
                    />
                </DemoContainer>
            </LocalizationProvider>
            <TableContainer component={Paper} className='table'>
                <Table dir="rtl" sx={{ minWidth: 50 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">שם</TableCell>
                            <TableCell align="center">נוכחות</TableCell>
                            <TableCell className='three' align="center">סיבת חיסור/הערות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRows.map((row) => (
                            <TableRow
                                // key={row.name}
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right" component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">
                                    <Select
                                        sx={{ width: 160 }}
                                        label="נוכחות"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={row.presence}
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            console.log(newValue);
                                            row.presence = newValue;
                                            row.dirty = true; 
                                        }}
                                    >
                                        {presence_options.map((option) => (
                                            <MenuItem key={option.id} value={option.label}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>                                   
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
            </TableContainer> {/* onChange={(e) => { onStatusChange(e) }} value={status} itemTemplate={statusTemplate} disabled={!driveInfo || !props.selectedPn} optionLabel="value" */}

            <Button className='toSend' onClick={save} variant="contained">שמירה</Button>
            
            {/* <Button className='toSend' onClick={loadPresenceOptions} variant="contained">זמני טען אופציות נוכחות</Button> */}
            {/* <Select
                                        sx={{ width: 160 }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={row.presence}
                                        label="נוכחות"
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            console.log(newValue);
                                            row.presence = newValue;
                                        }}
                                    >
                                        {presence_options.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
            </Select>        */}
        </div>
    );
}
