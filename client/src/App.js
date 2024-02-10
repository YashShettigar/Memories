import React from "react";
import { Container } from '@mui/material';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';

const App = () => {
    return (
        <BrowserRouter>
            <Container maxwidth="xl" sx={{ display: 'contents' }}>
                <Navbar />
                <Routes>
                    <Route index path="/" Component={() => <Navigate to="/posts" replace />}/>
                    <Route path="/posts" element={<Home />} />
                    <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App;