import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Avatar, AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';

import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

import { userSliceAction } from '../../store/userSlice';

import { navTheme } from './themes';

const Navbar = () => {
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        if (user.token.length > 500) googleLogout();
        dispatch(userSliceAction({ type: 'LOGOUT' }));
        navigate("/", { relative: false });
        setUser(null);
    }

    useEffect(() => {
        const token = user ? user.token : undefined;

        if (token) {
            const decodedToken = jwtDecode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <ThemeProvider theme={navTheme}>
            <AppBar position='static' color='inherit' className='appBar'>
                <Link to="/" replace className='brandContainer'>
                    <img className='brandName' src={memoriesText} alt="memories" height="45px" />
                    <img className='image' src={memoriesLogo} alt="memories_logo" height="40px" />
                </Link>
                <Toolbar className='toolbar'>
                    {user ? (
                        <div className='profile'>
                            <Avatar className='avatar' alt='userAvatar' src={user.result.picture || null}>{user.result.name.charAt(0)}</Avatar>
                            <Typography variant='h6' className='userName'>{user.result.name}</Typography>
                            <Button variant='contained' className='logout' color='secondary' onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" replace className='signInBtn' variant='contained'>Sign In</Button>
                    )}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default Navbar;