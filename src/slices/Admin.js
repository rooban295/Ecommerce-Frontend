import { createSlice } from "@reduxjs/toolkit";

const initialState={
    admin:false,
};

export const admin = createSlice({

    name:'admin',
    initialState,
    reducers:{
        setAdmin:(state,action)=>{
            state.admin = action.payload;
        }
    }
})

export const {setAdmin} = admin.actions;

export default admin.reducer;