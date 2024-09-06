import { createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze( {
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
})



const initialState = {
    men: {
        data: [],   
        status: STATUSES.IDLE,
    },
    women: {
        data: [],
        status: STATUSES.IDLE,
    },
    child: {
        data: [],
        status: STATUSES.IDLE,
    },
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action) {
            const { category, products } = action.payload;
            state[category].data = products;
        },
        setStatus(state, action) {
            const { category, status } = action.payload;
            state[category].status = status;
        }
    }
});

export const {setProducts , setStatus}  = productSlice.actions

export default productSlice.reducer;

export function fetchProducts(category){

      return async function fetchProductThunk(dispatch,getState){
        dispatch(setStatus({ category, status: STATUSES.LOADING }));

             
                try{
                    const result = await fetch(`http://localhost:4000/get-product?category=${category}`,{
                        method:'GET',
                        headers: {'Content-Type': 'application/json'}
                       })
    
                       const data = await result.json();
                       console.log(data)
                       
                       dispatch(setProducts({ category, products: data.products }));
                       dispatch(setStatus({ category, status: STATUSES.IDLE }));
    
                   }catch(err){
                    console.log(err)
                    dispatch(setStatus({ category, status: STATUSES.ERROR }));
                   }
            
      }
}




