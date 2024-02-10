import express from 'express';

import { getPost, getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost, commentPost } from '../controllers/posts.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.get('/', getPosts);

router.post('/post', auth, createPost);
router.patch('/:id/update', auth, updatePost)
router.delete('/:id/delete', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);

export default router;