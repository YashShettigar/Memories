import { CREATE, DELETE, UPDATE, FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, START_LOADING, END_LOADING, LIKE, COMMENT } from '../constants/actionTypes';
import { postsSliceAction } from '../store/postsSlice';
import * as api from '../api';

// Action Creators
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch(postsSliceAction({ type: START_LOADING }));
        
        const { data } = await api.fetchPost(id);
        dispatch(postsSliceAction({ type: FETCH_POST, data: data}));

        dispatch(postsSliceAction({ type: END_LOADING }));
    } catch (error) {
        console.log(error);
    }
}


export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch(postsSliceAction({ type: START_LOADING }));
        
        const { data } = await api.fetchPosts(page);
        dispatch(postsSliceAction({ type: FETCH_ALL, data: data}));

        dispatch(postsSliceAction({ type: END_LOADING }));
    } catch (error) {
        console.log(error);
    }
}


export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch(postsSliceAction({ type: START_LOADING }));

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch(postsSliceAction({ type: FETCH_BY_SEARCH, data: data}));

        dispatch(postsSliceAction({ type: END_LOADING }));
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch(postsSliceAction({ type: START_LOADING }));

        const { data } = await api.createPost(post);
        navigate(`/posts/${data._id}`);
        dispatch(postsSliceAction({ type: CREATE, data: data }));
        
        dispatch(postsSliceAction({ type: END_LOADING }));
    } catch (error) {
        console.log(error);
    }
}


export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch(postsSliceAction({ type: UPDATE, data: data }));
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id, navigate) => async (dispatch) => {
    try {
        await api.deletePost(id);
        navigate(0, { replace: true })
        dispatch(postsSliceAction({ type: DELETE, data: id }));
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch(postsSliceAction({ type: LIKE, data: data }));
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (comment, id) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(comment, id);
        
        dispatch(postsSliceAction({ type: COMMENT, data: data }));

        return data.comments;
    } catch (error) {
        console.log(error);
    }
}