import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/miniavs'
import './Dashboard.css'
import { SettingsEthernet } from '@mui/icons-material'

export function Dashboard(props) {

    const [mode, setMode] = useState('create')
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [focusID, setFocusID] = useState('')

    function Card(props) {

        let svg = createAvatar(style, {
            seed: props.user,
            backgroundColor: '#8338EC',
            radius: 50,
            flip: false
        })

        const handleDelete = () => {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-type': 'application/json', 'Authorization': 'Bearer ' + props.authToken},
                body: JSON.stringify({id: props.id})
            }

            fetch('http://localhost:8000/api/tweets/delete', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if('error' in data) {
                        console.log('Cannot logout')
                    } else {
                        setPosts(posts.filter(post => post._id != props.id))
                    }
                })
        }

        const updateMode = () => {
            setMode('edit')
            setTitle(props.title)
            setDescription(props.description)
            setFocusID(props.id)
        }
    
        return (
            <div className="dashboard-post">
                    <div className="dashboard-post-header">
                        <div>
                            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`} width="40px" alt="user"/>
                        </div>
                        <div className="dashboard-post-info">
                            <div className="dashboard-post-user"> {props.user} </div>
                            <div className="dashboard-post-date"> {props.createdAt} </div>
                        </div>
                        <div className={props.user!=props.loggedUser ? "dashboard-post-actions display-none" : "dashboard-post-actions"}>
                            <IconButton className="dashboard-action" onClick={handleDelete}>
                                <DeleteIcon/>
                            </IconButton>
                            <IconButton className="dashboard-action" onClick={updateMode}>
                                <EditIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <div className="dashboard-post-title">
                        {props.title}
                    </div>
                    <div className="dashboard-post-description">
                        {props.description}
                    </div>
                </div>
        )
    }

    const handleReset = () => {
        setMode('create')
        setTitle('')
        setDescription('')
    }

    const handleSave = () => {
        let options = {
            title, 
            description
        }

        if (mode == 'create') {
            options['user'] = props.username
        } else {
            options['id'] = focusID
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-type': 'application/json', 'Authorization': 'Bearer ' + props.authToken},
            body: JSON.stringify(options)
        }

        fetch(`http://localhost:8000/api/tweets/${mode}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if('error' in data) {
                    console.log('Cannot logout')
                } else {
                    if (mode == 'create') {
                        const updatedPosts = [{id: data['id'], title, description, user: props.username, updatedAt: data['updated_at']}, ...posts]
                        setPosts(updatedPosts)
                    } else {
                        const unfocusedPosts = posts.filter(post => post.id != focusID)
                        setPosts([{id: focusID, title, description, user: props.username, updatedAt: data['updated_at']}, ...unfocusedPosts])

                    }
                    setMode('create')
                }
            })
    }

    useEffect(() => {
        if (props.authToken != '') {
            const requestOptions = {
                method: 'GET',
                headers: {'Content-type': 'application/json', 'Authorization': 'Bearer ' + props.authToken},
            }

            fetch('http://localhost:8000/api/tweets', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if('error' in data) {
                        console.log('Cannot logout')
                    } else {
                        setPosts(data['tweets'])
                    }
                })
        }
    }, [props.authToken])

    return (
        <div className='dashboard'>
            <div className="dashboard-form-card">
                <div className="text-center">
                    <img src={require(`../images/${mode}_post.png`)} width="225px" alt="new_post"/>
                    <br/>
                    <TextField label="Title" onChange={(event) => setTitle(event.target.value)} value={title} className="dashboard-text-field"/>
                    <br/>
                    <TextField label="Post" onChange={(event) => setDescription(event.target.value)} value={description} className="dashboard-text-field" multiline rows={4}/>
                </div>
                <div className="text-right">
                    <Button variant="outlined" className="cancel-button" onClick={handleReset}>
                        { mode == 'create' ? 'Reset' : 'Cancel' }
                    </Button>
                    <Button variant="contained" className="save-button" onClick={handleSave} disabled={title == "" || description == ""}>
                        { mode == 'create' ? 'Post' : 'Save changes' }
                    </Button>
                </div>
            </div>

            {posts.map(post => {
                return <Card title={post.title}
                             description={post.description}
                             user={post.user}
                             createdAt={post.updated_at ? new Date(post.updated_at).toLocaleString('en-US') : 'just now'}
                             id={post._id}
                             key={post._id}
                             authToken={props.authToken}
                             loggedUser={props.username}/>
            })}

            {/* <div className="rotate">
                <img src={require('../images/loading_babusca.png')} alt="loading_babuska" width="100px"/>
            </div> */}

        </div>
    )
}