import { createSlice } from "@reduxjs/toolkit";

const initialState={
    searchProduct:[],
};

export const search = createSlice({

    name:'search',
    initialState,
    reducers:{
        setSearch:(state,action)=>{
            state.searchProduct = action.payload;
        }
    }
})

export const {setSearch} = search.actions;

export default search.reducer;