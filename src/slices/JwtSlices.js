import { createSlice } from "@reduxjs/toolkit";

const initialState={
    jwtToken:{},
};

export const jwtslices = createSlice({

    name:'jwtToken',
    initialState,
    reducers:{
        setJwtToken:(state,action)=>{
            state.jwtToken = action.payload;
        }
    }
})

export const {setJwtToken} = jwtslices.actions;

export default jwtslices.reducer;