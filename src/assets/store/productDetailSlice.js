import {createSlice} from "@reduxjs/toolkit"

import { STATUSES } from "./productSlice"; // Import STATUSES for consistency

const initialState = {
    product: null,
    status: STATUSES.IDLE,
};


const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers:{
        setProductDetail(state, action){
            state.product = action.payload
        },
        setDetailStatus(state, action){
            state.status = action.payload
        }

    }
})

export const { setProductDetail, setDetailStatus } = productDetailSlice.actions;

export default productDetailSlice.reducer;


export function fetchProductDetail(productId){
    return async function fetchProductDetailThunk(dispatch) {
        
        dispatch(setDetailStatus(STATUSES.LOADING));
        
        try {
            const response = await fetch(`http://localhost:4000/get-product/${productId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            
            dispatch(setProductDetail(data.product));
            dispatch(setDetailStatus(STATUSES.IDLE));
        } catch (err) {
            console.error(err);
            dispatch(setDetailStatus(STATUSES.ERROR));
        }
    };
}