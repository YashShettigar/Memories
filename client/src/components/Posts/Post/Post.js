import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Tooltip, ButtonBase } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutline from'@mui/icons-material/ModeEditOutline';
import moment from 'moment';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

import { postTheme } from './themes';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post?.likes);
    const user = JSON.parse(localStorage.getItem('profile'));

    const userId = user?.result?._id;
    const hasLikedPost = post.likes.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([...post.likes, userId]);
        }
    }

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId) ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => {
        navigate(`${post._id}`);
    }

    return (
        <ThemeProvider theme={postTheme}>
            <Card className='card' raised elevation={6}>
                <ButtonBase className='cardSelection' onClick={openPost}>
                    <CardMedia className='media' image={post.selectedFile} title={post.title} />
                    <div className='overlay'>
                        <Typography variant='h6'>{post.name}</Typography>
                        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                    </div>
                    {((user && user.result ? user.result._id : undefined) === (post ? post.creator : undefined)) ? (
                        <div className='overlay2'>
                            <Button style={{color: 'white'}} size="small" onClick={(e) => { e.stopPropagation(); setCurrentId(post._id)}}>
                                <Tooltip title="click to edit this post" placement='right-end' enterDelay={700} leaveDelay={200} arrow>
                                    <ModeEditOutline fontSize="medium" />
                                </Tooltip>
                            </Button>
                        </div>
                    ) : console.log(post.creator)}
                    <div className='details'>
                        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                    </div>
                    <Typography className='title' variant="h5" gutterBottom>{post.title}</Typography>
                    <CardContent>
                        <Typography variant="body2" color='textSecondary' component="p">{post.message}</Typography>
                    </CardContent>
                </ButtonBase>
                <CardActions className='cardActions'>
                    <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
                        <Likes />
                    </Button>
                    {((user && user.result ? user.result._id : undefined) === (post ? post.creator : undefined)) && (
                        <Button size='small' color='error' onClick={() => dispatch(deletePost(post._id, navigate))}>
                            <DeleteIcon fontSize='small' color='error'/>
                            Delete
                        </Button>
                    )}
                </CardActions>
            </Card>
        </ThemeProvider>
    )
}

export default Post;