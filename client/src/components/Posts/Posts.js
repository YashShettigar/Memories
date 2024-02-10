import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CircularProgress, Grid } from '@mui/material';

import Post from './Post/Post';
import { postsTheme } from './themes';

import { useSelector } from 'react-redux';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return 'No Posts!';

  return (
    isLoading ? <CircularProgress /> : (
        <ThemeProvider theme={postsTheme}>
          <Grid className='container' container alignItems="stretch" spacing={3}>
              {posts.map((post) => (
                  <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                      <Post post={post} setCurrentId={setCurrentId} />
                  </Grid>
              ))}
          </Grid>
        </ThemeProvider>
      ) 
  )
}

export default Posts;
