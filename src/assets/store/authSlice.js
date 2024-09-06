import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : !!localStorage.getItem('token')
}


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('userId', action.payload.userId);
            console.log('Login: token set');
        },
        logout:(state)=>{
            state.isAuthenticated=false;
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            console.log('Logout: token removed');
        
        }
    }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer;