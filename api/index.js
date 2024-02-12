import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000', xsrfCookieName: 'csrftoken', xsrfHeaderName: 'X-CSRFToken', withCredentials: true, withXSRFToken: true });

const getCookie = (name) => {
    let cookieValue = null;
    const cookies = document.cookie?.split(';');
    for (let cookie of cookies) {
      const cookieStr = cookie.trim();
      if (cookieStr.substring(0, name.length+1) === name+'=') {
          cookieValue = cookieStr.substring(name.length+1);
          break;
      }
    }
    return cookieValue;
}

API.interceptors.request.use((req) => {
    const csrftoken = getCookie('X-CSRFToken');
    req.headers['X-CSRFToken'] = csrftoken;


    if(localStorage.getItem('profile')) {
        req.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
     
    return req;
});

export const registerCSRFCookie = async () => {
    try {
        await API.get('/api/register');
    } catch (error) {
        console.log(error);
    }
}

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts/?page=${page || 1}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search/?searchQuery=${searchQuery.searchItem || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts/post', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}/update`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}/delete`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (comment, id) => API.post(`/posts/${id}/commentPost`, { comment });

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
