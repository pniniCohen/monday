import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt'),
    createData('Ice cream sandwich'),
    createData('Eclair'),
    createData('Cupcake'),
    createData('Gingerbread'),
];

export default function TableData() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>שם</TableCell>
                        <TableCell align="center">נוכחות</TableCell>
                        <TableCell align="right">סיבה</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
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
                            <TableCell align="right">{row.fat}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}