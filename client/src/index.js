import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { store } from './store/store';
import App from './App';

import './index.css';
import rootTheme from './themes';

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ThemeProvider theme={rootTheme}>
            <GoogleOAuthProvider clientId='Your Google OAuth2.0 Client ID'>
                <App />
            </GoogleOAuthProvider>
        </ThemeProvider>
    </Provider>
);