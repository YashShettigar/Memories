import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';

import { postDetailsTheme } from './themes';

import CommentSection from './Comments/CommentSection';

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    useEffect(() => {
        if (post) dispatch(getPostsBySearch({ searchItem: 'none', tags: post?.tags.map((tag) => tag.trim()).join(',') }));
    }, [post]);

    if (!post) return null;

    if (isLoading) {
        return (
            <ThemeProvider theme={postDetailsTheme}>
                <Paper className='loadingPaper' elevation={6}>
                    <CircularProgress size="7em" />
                </Paper>
            </ThemeProvider>
        )
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    const openPost = (_id) => {
        navigate(`/posts/${_id}`, { relative: false });
    }
    
    return (
        <ThemeProvider theme={postDetailsTheme}>
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <div className='card'>
                    <div className='section'>
                        <Typography variant="h3" component="h2">{post.title}</Typography>
                        <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                        <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                        <Typography variant="h6">Created by: {post.name}</Typography>
                        <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                        <Divider style={{ margin: '20px 0' }} />
                        <CommentSection post={post} />
                        <Divider style={{ margin: '20px 0' }} />
                    </div>
                    <div className='imageSection'>
                        <img className='media' src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                    </div>
                </div>
                {recommendedPosts.length ? (
                    <div className='section'>
                        <Typography gutterBottom variant='h5' >You might also like:</Typography>
                        <Divider />
                        <div className='recommendedPosts'>
                            {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
                                <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id} >
                                    <Typography gutterBottom variant='h6'>{title}</Typography>
                                    <Typography gutterBottom variant='subtitle2' style={{ fontStyle: 'italic' }}>{name}</Typography>
                                    <Typography gutterBottom variant='body2'>{message}</Typography>
                                    <Typography gutterBottom variant='subtitle1'>Likes: {likes.length}</Typography>
                                    <img src={selectedFile} width='200px' alt="recommended-post" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </Paper>
        </ThemeProvider>
    )
}

export default PostDetails;
