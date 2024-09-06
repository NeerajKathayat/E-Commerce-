import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentOrder:{
        finalAmount: 0,
        items: [],
        address: {
            fullName: '',
            email: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            postalCode: '',
        },
    },
    pastOrders:[],
};

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        setCurrentOrder(state,action){
            state.currentOrder = action.payload
        },
        updateAddress(state, action) {
            state.currentOrder.address = {
                ...state.currentOrder.address,
                ...action.payload,
            };
        },
        addPastOrder(state,action){
               state.pastOrders.push(state.currentOrder);
               state.currentOrder = {
                 finalAmount: 0,
                 items: [],
                 address: {
                    fullName: '',
                    email: '',
                    phone: '',
                    street: '',
                    city: '',
                    state: '',
                    postalCode: '',
                },
               }
        }
    }
})

export const { setCurrentOrder, updateAddress ,addPastOrder } = orderSlice.actions;
export default orderSlice.reducer;