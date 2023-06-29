import React from 'react';
import './MyComponnet.css';
import Login from './Login/Login';

const imageUrl = process.env.PUBLIC_URL + '/irox.png';


const MyComponnet = () => {

    return (
        <div className='login'>
           <div >
                <img src={imageUrl} alt={`תמונה `} />
                <h2>דוח שני ורביעי</h2>
            </div>
            <Login></Login>
        </div>
    );
};


export default MyComponnet;

