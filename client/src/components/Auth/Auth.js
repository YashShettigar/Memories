import React, { useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { Container, Paper, Avatar, Grid, Button, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGoogleLogin } from "@react-oauth/google";
import { signup, signin } from '../../actions/auth';

import Icon from './icon';
import Input from './Input';

import { authTheme } from "./themes";

const initialState = { firstName: '', lastName:'', email: '', password: '', confirmedPassword: '' }

const Auth = () => {
    const [ showPassword, setShowPassword ] = useState(false);
    const [ isSignUp, setIsSignUp ] = useState(false);
    const [ formData, setFormData ] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    }

    const googleSuccess = (codeResponse) => {
        console.log(codeResponse);
        dispatch(signin(codeResponse, navigate));
    }

    const googleFailure = (err) => {
        console.log(err);
    }

    const googleLogin = useGoogleLogin({
        onSuccess: googleSuccess,
        onError: googleFailure,
        flow: 'auth-code'
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    return (
        <ThemeProvider theme={authTheme}>
            <Container component='main' maxWidth="xs">
                <Paper className='paper' elevation={3}>
                    <Avatar className='avatar'>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5'>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Typography>
                    <form className='form' onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSignUp && 
                                <>
                                    <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label="Last Name" handleChange={handleChange}  xs={6} half />
                                </>
                            }
                            <Input name='email' label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            { isSignUp && <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange} type="password" />}
                        </Grid>
                        <Button type='submit' fullWidth variant='contained' color='primary' className='submit'>
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <Button className='googleButton' color='primary' fullWidth startIcon={<Icon />} variant='contained' onClick={() => googleLogin()}>
                            Google Login
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button onClick={switchMode}>
                                    { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up!" }
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}

export default Auth
