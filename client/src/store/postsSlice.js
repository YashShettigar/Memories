import { createSlice } from '@reduxjs/toolkit';
import postsReducer from "../reducers/posts";

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        isLoading: true,
        posts: []
    },
    reducers: {
        postsSliceAction: postsReducer
    }
});

export const { postsSliceAction } = postsSlice.actions;
export default postsSlice.reducer;