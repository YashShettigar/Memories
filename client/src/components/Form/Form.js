import React, { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Button, ThemeProvider } from '@mui/material';
import FileBase from 'react-file-base64';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../../actions/posts';

import { formStyles } from './themes';

const Form = ({ currentId, setCurrentId }) => {
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ postData, setPostData ] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user ? user.result ? user.result.name : undefined : undefined }));
        } else {
            dispatch(createPost({ ...postData, likes: [], name: user ? user.result ? user.result.name : undefined : undefined }, navigate));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }

    if (!(user ? user.result ? user.result.name : undefined : undefined)) {
        return (
            <ThemeProvider theme={formStyles}>
                <Paper className='paper'>
                    <Typography variant='h6' align='center'>
                        Please Sign In to create your own Memories!
                    </Typography>
                </Paper>
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider theme={formStyles}>
            <Paper className='paper' elevation={6}>
                <form autoComplete='off' noValidate className='root form' onSubmit={handleSubmit}>
                    <Typography variant='h6'>{currentId ? 'Editing': 'Creating'} a Memory</Typography>
                    <TextField name='title' variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                    <TextField name='message' variant='outlined' label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                    <TextField name='tags' variant='outlined' label="Tags (comma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}/>
                    <div className='fileInput'>
                        <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}/>
                    </div>
                    <Button className='buttonSubmit' variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        </ThemeProvider>
    )
}

export default Form;