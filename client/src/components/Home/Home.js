import React, { useState } from "react";
import { Container, Grow, Grid, ThemeProvider, Paper, AppBar, TextField, Button } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import { useNavigate, useLocation } from 'react-router-dom';

import { getPostsBySearch } from '../../actions/posts';
import { useDispatch } from "react-redux";

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from "../Pagination/Pagination";

import { homeStyles } from './themes';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [ currentId, setCurrentId ] = useState(null);
    const [searchItem, setSearchItem] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const searchPost = () => {
        if (searchItem.length || tags.length) {
            searchItem.trim();
            dispatch(getPostsBySearch({ searchItem, tags: tags.join(',') }));

            navigate(`/posts/search?searchQuery=${searchItem || 'none'}&tags=${tags.join(',')}`, { relative: false });
        } else {
            navigate("/", { relative: false });
        }
    }

    const handleSearchInput = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }
    
    return (
        <Grow in>
            <Container maxWidth="xl" sx={{ paddingBlockEnd: '24px' }}>
                <ThemeProvider theme={homeStyles}>
                    <Grid container className='mainContainer' justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={6} md={9} >
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} >
                            <AppBar className="appBarSearch" position="static" color="inherit">
                                <TextField 
                                    name="search" 
                                    variant="outlined" 
                                    label="Search Memories" 
                                    fullWidth 
                                    value={searchItem} 
                                    onChange={(e) => setSearchItem(e.target.value)} 
                                    onKeyDownCapture={handleSearchInput}
                                />
                                <MuiChipsInput 
                                    className="chipInput"
                                    value={tags}
                                    onChange={(newTags) => setTags(newTags)}
                                    clearInputOnBlur
                                    label="Search Tags"
                                    placeholder=""
                                />
                                <Button className="searchButton" onClick={searchPost} color="primary" variant="contained" >Search</Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            { !searchQuery && !tags.length && (
                                <Paper className="pagination" elevation={6}>
                                    <Pagination page={page} />
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </Container>
        </Grow>
    )
}

export default Home;