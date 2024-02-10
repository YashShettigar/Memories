import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Pagination, PaginationItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../actions/posts';

import { pageTheme } from './themes';
import { Link } from 'react-router-dom';

const Paginate = ({ page }) => {
    const dispatch = useDispatch();
    const { numberOfPages } = useSelector((state) => state.posts);

    useEffect(() => {
        if (page) dispatch(getPosts(page));
    }, [page]);

    return (
        <ThemeProvider theme={pageTheme}>
            <Pagination 
                className='page'
                variant='outlined'
                count={numberOfPages}
                page={Number(page)}
                color="primary"
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        component={Link}
                        to={`/posts?page=${item.page}`}
                    />
                )}
            />
        </ThemeProvider>
    )
}

export default Paginate;