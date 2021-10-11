// Styling
import './App.css'

// React
import React, { useState, useEffect } from 'react'

// Components
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Register } from './pages/Register'

// Router
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom"

// Avatars
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/miniavs'

// Material
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function App() {

    const [authFlag, setAuthFlag] = useState(false)
    const [authToken, setAuthToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    const [userName, setUserName] = useState('empty')
    const [refreshInterval, setRefreshInterval] = useState(null)

    let svg = createAvatar(style, {
        seed: userName,
        backgroundColor: '#8338EC',
        radius: 50,
        flip: false
    })

    const refreshRequest = (refreshToken) => {
        {
            let tokenUsed = ''
            if (refreshToken === '') {
                tokenUsed = localStorage.getItem('refreshToken')
            } else {
                tokenUsed = refreshToken
            }

            const requestOptions = {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({token: tokenUsed}),
            }
    
        
            fetch('http://localhost:4000/token', requestOptions)
            .then(response => response.json())
            .then(data => {
                if('error' in data) {
                    if (data['status'] == 1) {
                        console.log('from token')
                        localStorage.removeItem('refreshToken')
                        setAuthFlag(false)
                    }
                } else if (data['auth']) {
                    setAuthToken(data['auth'])
                }
            })
        }
    }

    // this hook executes at App mount, check refresh token
    useEffect(() => {
        
        let localRefreshKey = localStorage.getItem('refreshToken')
        let localUsername = localStorage.getItem('username')
        if (localRefreshKey) {
            setRefreshToken(localRefreshKey)
            setUserName(localUsername)
            setAuthFlag(true)
            refreshRequest(localRefreshKey)
            startRefreshLoop(localRefreshKey)
        } else {
            setAuthFlag(false)
        }
        
    }, [])


    const startRefreshLoop = (refreshKey) => {
        // every minute refresh auth token
        setRefreshInterval(setInterval(() => refreshRequest(refreshKey), 60000 ))
    }

    const handleUserAuth = (data) => {
        
        setAuthFlag(true)
        setRefreshToken(data['refresh'])
        setUserName(data['username'])
        setAuthToken(data['auth'])

        // save refresh token to local storage
        localStorage.setItem('refreshToken', data['refresh'])
        localStorage.setItem('username', data['username'])
        startRefreshLoop(data['refresh'])
    }

    const handleLogout = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({token: refreshToken}),
        }

        fetch('http://localhost:4000/logout', requestOptions)
            .then(response => response.json())
            .then(data => {
                if('error' in data) {
                    console.log('Cannot logout')
                } else {
                    // localstorage cleanup
                    console.log('from logout')
                    localStorage.removeItem('refreshToken')
                    localStorage.removeItem('username')
                    
                    // app cleanup
                    setAuthToken('')
                    setRefreshToken('')
                    setUserName('')
                    setAuthFlag(false)
                    clearInterval(refreshInterval)
                }
            })
    }

    return (
        <BrowserRouter>
            <AppBar position="relative" className="app-bar">
                <Toolbar>
                    <div className="app-bar-image">
                        <img src={require('./images/la_sfat.png')} alt="la_sfat" width="200"/>
                    </div>
                    <div className="app-bar-content">
                        {(authFlag) ?
                            (<Link to="/">
                                <IconButton className="app-bar-item">
                                    <DashboardIcon/>
                                </IconButton>
                            </Link>) :
                            (<Link to="/register">
                                <IconButton className="app-bar-item">
                                    <PersonAddIcon/>
                                </IconButton>
                            </Link>)
                        }
                        {(authFlag) ?
                            (<IconButton className="app-bar-item" onClick={handleLogout}>
                                <LogoutIcon/>
                            </IconButton>) :
                            (<Link to="/login">
                                <IconButton className="app-bar-item">
                                    <LoginIcon />
                                </IconButton>
                            </Link>)
                        }
                        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`} width="40" className="app-bar-user-image"/>
                    </div>
                </Toolbar>
            </AppBar>

            <Switch>
                <Route path="/register">
                {!(authFlag) ? <Register/> : <Redirect to='/login'/> }
                </Route>
                <Route path="/login">
                    {!(authFlag) ? <Login handleUserAuth={handleUserAuth}/> : <Redirect to='/'/>}
                </Route>
                <Route exact path="/">
                    {(authFlag) ? <Dashboard authToken={authToken}
                                             username={userName}/> : <Redirect to='/login'/> }                    
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
