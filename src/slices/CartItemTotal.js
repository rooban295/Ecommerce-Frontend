import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cartTotalItem : 0
}

export const cartItemTotal =createSlice({
    name:'cartTotalItem',
    initialState,
    reducers:{
        setCartTotal:(state,action)=>{
            state.cartTotalItem = action.payload;
        }
    }
})


export const {setCartTotal}= cartItemTotal.actions;

export default cartItemTotal.reducer;