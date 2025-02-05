import {createSlice} from "@reduxjs/toolkit"

const initialState={
    categoryId: 0
}

export const categorySlices=createSlice({
    name:'categoryId',   //slice unique name
    initialState,
    reducers:{
        setCategoryId:(state,action)=>{
            state.categoryId = action.payload;
        }
    }
})

export const {setCategoryId}=categorySlices.actions;

export default categorySlices.reducer;