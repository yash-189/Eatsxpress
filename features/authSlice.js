import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null
}

export const authSlice = createSlice({
    name:'userAuth',
    initialState,
    reducers:{
        setSignIn: (state,action)=>{

            state.email = action.payload.email;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.userName = action.payload.userName;

            console.log(action.payload,'pload',state);
        },

        signOut: (state,action)=>{
            state.email = null;
            state.userName = null;
            state.isLoggedIn = false;
        }

        
    }
})


export const { setSignIn, signOut} = authSlice.actions

export const selectIsLoggedIn = (state)=> state.userAuth?.isLoggedIn

export const selectEmail = (state) => state.userAuth?.email
// export const selectBasketItems = (state) => state.basket.items
export const selectUserName = (state) => state.userAuth.userName;

export default authSlice.reducer;