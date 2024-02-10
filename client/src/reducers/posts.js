import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING, FETCH_POST, COMMENT } from "../constants/actionTypes";

const postsReducer = (state, { type, payload }) => {
    switch (payload.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case CREATE:
            return { ...state, posts: [ ...state.posts, payload.data] };
        case FETCH_ALL:
            return {
                ...state,
                posts: payload.data.data,
                currentPage: payload.data.currentPage,
                numberOfPages: payload.data.numberOfPages
            };
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: payload.data
            };
        case FETCH_POST:
            return { ...state, post: payload.data };
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === payload.data._id ? payload.data : post) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== payload.data) };
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === payload.data._id ? payload.data : post) };
        case COMMENT:
            return { ...state, posts: state.posts.map((post) => post._id === payload.data._id ? payload.data : post) };
        default:
            return state;
    }
}

export default postsReducer;