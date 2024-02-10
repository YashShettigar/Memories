import React, { useState, useRef } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Typography, TextField, Button, Container } from '@mui/material';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../../actions/posts';

import { commentThemes } from './themes';

const CommentSection = ({ post }) => {
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const commentsRef = useRef(null);
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView(true, { behavior: 'smooth' });
    }

    return (
        <ThemeProvider theme={commentThemes}>
            <Container className='commentsOuterContainer'>
                <div className='commentsInnerContainer'>
                    <Typography gutterBottom variant='h6' >Comments</Typography>
                    {comments.map((comment, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <strong>{comment.split(': ')[0]}</strong>
                            {comment.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant='h6' >Write a comment</Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant='outlined'
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant='contained' color='primary' onClick={(e) => handleClick(e)}>
                            Comment
                        </Button>
                    </div>
                )}
            </Container>
        </ThemeProvider>
    )
};

export default CommentSection;
;