import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import '../App.css'
import Button from '@mui/material/Button'
import LoginIcon from '@mui/icons-material/Login'
import './Login.css'
import { useHistory } from 'react-router-dom'

export function Register(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    
    let history = useHistory()

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleVerifyPassword = (event) => {
        setVerifyPassword(event.target.value)
    }

    const handleName = (event) => {
        setUserName(event.target.value)
    }

    const handleRegister = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email: email, password, password, username: userName, verifyPassword: verifyPassword}),
        }

    
        fetch('http://localhost:4000/register', requestOptions)
        .then(response => response.json())
        .then(data => {
            if('error' in data) {
                //display toast/snackbar
            } else {
                history.push('/login')
            }
        })
    }


    return (
        <div className="login">
            <div className="login-card">
                <div className="text-center">
                    <img src={require('../images/register.png')} alt="la_sfat" width="250"/>
                    <br/>
                    <TextField label="Name" value={userName} onChange={handleName} className="text-field"/>
                    <br/>
                    <TextField label="E-mail" value={email} onChange={handleEmail} className="text-field"/>
                    <br/>
                    <TextField label="Password" value={password} onChange={handlePassword} type="password" className="text-field"/>
                    <br/>
                    <TextField label="Verify password" value={verifyPassword} onChange={handleVerifyPassword} type="password" className="text-field"/>
                    <br/>
                    <Button variant="contained" 
                            startIcon={<LoginIcon />}
                            className="login-button"
                            onClick={handleRegister}>
                        Register
                    </Button>
                </div>
            </div>
        </div>
    )
}