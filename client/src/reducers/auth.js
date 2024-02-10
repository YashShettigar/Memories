import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (user, { type, payload }) => {
    switch (payload.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...(payload ? payload.data : undefined) }));

            return { ...user, authData: payload ? payload.data : undefined };    
        case LOGOUT:
            localStorage.clear();
            
            return { ...user, authData: null };    
        default:
            return user;
    }
}

export default authReducer;