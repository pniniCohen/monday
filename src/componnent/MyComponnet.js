import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import TableData from './TableData';
import Button from '@mui/material/Button';

const teamLeader = ['חיה','מלכי','שולמית','ציפי'];


const MyComponnet = () => {
    return (
        <div>
            <h1>Irox!</h1>
            <h2>דוח שני ורביעי</h2>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={teamLeader}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="ראש צוות" />}
            />
            <TableData></TableData>

            <Button variant="contained">Contained</Button>

        </div>
    );
};

export default MyComponnet;
