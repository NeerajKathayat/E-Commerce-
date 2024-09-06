import { createSlice } from "@reduxjs/toolkit";


// Function to load the initial state from localStorage
const loadInitialCartState = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return [];
    const savedCart = localStorage.getItem(`cart_${userId}`);
    return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = loadInitialCartState();


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      return action.payload;
    },
    resetCart(state) {
      return [];
    },
    add(state, action) {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const existingItem = state.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
    },
    remove(state, action) {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const updatedState = state.filter((item) => item._id !== action.payload);
      localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedState));
      // Check if the cart is now empty
      if (updatedState.length === 0) {
        localStorage.removeItem(`cart_${userId}`);
      }

      return updatedState;
    },
    increaseQuantity(state, action) {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const item = state.find((item) => item._id === action.payload);
      if (item && item.quantity < item.Stock) {
        item.quantity += 1;
        localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
      }
    },
    decreaseQuantity(state, action) {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const item = state.find((item) => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
      }
    },
  },
});

export const {
  setCart,
  resetCart,
  add,
  remove,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
