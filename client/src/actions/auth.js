import { AUTH } from "../constants/actionTypes";
import { userSliceAction } from '../store/userSlice';
import * as api from '../api';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch(userSliceAction({ type: AUTH, data }));

        navigate("/", { replace: true });
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch(userSliceAction({ type: AUTH, data }));
        
        navigate("/", { replace: true });
    } catch (error) {
        console.log(error);
    }
}