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
import './TableData.css';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    'שרה',
    'חיה',
    'לאה',
    'רחלי',
    'יהודית',
];

// const rows = [
//     createData('שרה'),
//     createData('חיה'),
//     createData('לאה'),
//     createData('רחלי'),
//     createData('יהודית'),
// ];

export default function TableData() {
    return (
        <TableContainer  component={Paper} className='table'>
            <Table  sx={{ minWidth: 50 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>שם</TableCell>
                        <TableCell  align="center">נוכחות</TableCell>
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
                            <TableCell  align="center">
                                <TextField label="סיבה" variant="standard" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
