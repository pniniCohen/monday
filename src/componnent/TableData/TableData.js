import * as React from 'react';
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
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const imageUrl = process.env.PUBLIC_URL + '/irox.png';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
// const rows = [
//     createData('שרה'),
//     createData('חיה'),
//     createData('לאה'),
//     createData('רחלי'),
//     createData('יהודית'),
// ];

const rows = [
    'שרה',
    'חיה',
    'לאה',
    'רחלי',
    'יהודית',
];
const options = ['עובדת מהבית', 'לא עובדת'];




export default function TableData() {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
        console.log(selectedDate);

      };

    const { state } = useLocation();
    console.log(state.nameTeam);
    return (
        <div className='all'>
            <div>
                <img src={imageUrl} alt={`תמונה `} />
                <h2>דוח שני ורביעי</h2>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        className="dateCheck"
                        onChange={handleDateChange}
                        label="תאריך יום בדיקה"
                    />
                </DemoContainer>
            </LocalizationProvider>
            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 50 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>שם</TableCell>
                            <TableCell align="center">נוכחות באירוקס</TableCell>
                            <TableCell align="center">נוכחות עבודה</TableCell>
                            <TableCell className='three' align="center">סיבה</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                // key={row.name}
                                key={row}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row}
                                </TableCell>
                                <TableCell align="center">
                                    <Checkbox
                                        color="primary"
                                        // indeterminate={numSelected > 0 && numSelected < rowCount}
                                        // checked={rowCount > 0 && numSelected === rowCount}
                                        // onChange={onSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all desserts',
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Autocomplete
                                        className='work'
                                        // value={value}
                                        // onChange={(event, newValue) => {
                                        //     setValue(newValue);
                                        // }}
                                        // inputValue={inputValue}
                                        // onInputChange={(event, newInputValue) => {
                                        //     setInputValue(newInputValue);
                                        // }}
                                        id="controllable-states-demo"
                                        options={options}
                                        sx={{ width: 200 }}
                                        renderInput={(params) => <TextField {...params} label="?האם עובדת" />}
                                    />
                                </TableCell>

                                <TableCell align="center">
                                    <TextField label="סיבה" variant="standard" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button className='toSend' variant="contained">שמירה</Button>
        </div>
    );
}
