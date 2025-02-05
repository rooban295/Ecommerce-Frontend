import { configureStore } from "@reduxjs/toolkit";

import  categoryReducer from "../slices/CategorySlices";
import  jwtReducer  from "../slices/JwtSlices";
import  cartItemReducer from "../slices/CartItemTotal";
import  adminReducer  from "../slices/Admin";
import searchReducer from "../slices/Search";



const store =configureStore({

    reducer:{
        categoryId:categoryReducer,
        jwt:jwtReducer,
        ItemTotal:cartItemReducer,
        admin:adminReducer,
        search:searchReducer
    },

})

export default store;