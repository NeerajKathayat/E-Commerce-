import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import productReducer from './productSlice'
import productDetailReducer from "./productDetailSlice";
import cartReducer from "./cartSlice"
import orderReducer from "./orderSlice"
import wishListReducer from "./wishListSlice"
const store = configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
        productDetail:productDetailReducer,
        cart:cartReducer,
        order:orderReducer,
        wishList:wishListReducer
    }
})

export default store;