import { createSlice } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        authData: null
    },
    reducers: {
        userSliceAction: authReducer
    }
});

export const { userSliceAction } = userSlice.actions;
export default userSlice.reducer;