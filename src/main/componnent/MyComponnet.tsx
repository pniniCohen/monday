import React, { Component, Suspense, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import './MyComponnet.css';
import Button from '@mui/material/Button';
import Login from './Login/Login';
import TableData from './TableData/TableData';
import authService from "../services/auth.service";
const imageUrl = process.env.PUBLIC_URL + '/irox.png';


class MyComponnet extends Component {

    state = {loggedOut:true}
     
    updateLoggedOut = (newValue:boolean) => {
        this.setState({loggedOut:newValue});
  };

    render() {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <div className='login'>
                    <div style={{ display: "flex" }}>
                        <LogoutButton loggedOut={this.state.loggedOut} updateLoggedOut={this.updateLoggedOut}/>
                    </div>
                    <br />
                    <div>
                        <img src={imageUrl} alt={`תמונה `} />
                        <h2>דוח שני ורביעי</h2>
                    </div>
                    <div className="layout-main-container">
                        <div className="layout-main">
                            <Routes>
                                <Route path="/login" element={<Login loggedOut={this.state.loggedOut} updateLoggedOut={this.updateLoggedOut}/>} />
                                <Route path="/" element={<Login />} />
                                <Route path="/tableData" element={<TableData />} />
                                {/* <Route path="/" element={this.state.token ? <Navigate to="/tableData" /> : <Login/>} /> */}
                            </Routes>
                        </div>
                        {/* <Footer layoutColorMode={layoutColorMode} /> */}
                    </div>
                </div>
            </Suspense>
        );
    }
};

export default MyComponnet;

export const LogoutButton = (props:any) => {

    const logout = () => {
        localStorage.removeItem("access_token")
        props.updateLoggedOut(true)
    };

    if (props.loggedOut) { 
        new authService().logout();
        return <Navigate replace to="/login" />
    }

    return <Button onClick={logout}>LogOut</Button>;
};


