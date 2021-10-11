import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import '../App.css'
import Button from '@mui/material/Button'
import LoginIcon from '@mui/icons-material/Login'
import './Login.css'
import { useHistory } from 'react-router-dom'

export function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let history = useHistory()

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const submitLoginCredentials = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email: email, password, password}),
        }

    
        fetch('http://localhost:4000/login', requestOptions)
        .then(response =>  response.json())
        .then(data => {
            if('errors' in data) {
                //display toast/snackbar
            } else if ('error' in data) {
                // send auth info to the app component
            } else {
                props.handleUserAuth(data)
                history.push('/')
            }
        })
        
    }

    return (
        <div className="login">
            <div className="login-card">
                <div className="text-center">
                    <img src={require('../images/log_in.png')} alt="la_sfat" width="200"/>
                    <br/>
                    <TextField label="E-mail" onChange={handleEmail} value={email} className="text-field"/>
                    <br/>
                    <TextField label="Password" onChange={handlePassword} value={password} type="password" className="text-field"/>
                    <br/>
                    <Button variant="contained" 
                            startIcon={<LoginIcon />}
                            className="login-button"
                            onClick={submitLoginCredentials}
                            disabled={email === '' || password ===''}
                            >
                        Log in
                    </Button>
                </div>
            </div>
        </div>
    )
}