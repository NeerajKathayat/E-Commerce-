import { createSlice } from "@reduxjs/toolkit";

// Function to load wishlist from localStorage
const loadWishlistFromLocalStorage = () => {
  const userId = localStorage.getItem("userId");
  if (!userId) return [];
  const savedWishlist = localStorage.getItem(`wish_${userId}`);
  return savedWishlist ? JSON.parse(savedWishlist) : [];
};

// Initial state loaded from localStorage
const initialState = loadWishlistFromLocalStorage();

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    setWish(state, action) {
      return action.payload;
    },
    resetWish(state) {
      return [];
    },
    addWish(state, action) {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      if (!state.find((item) => item._id === action.payload._id)) {
        state.push(action.payload);
        localStorage.setItem(`wish_${userId}`, JSON.stringify(state));
      }
    },
    removeWish(state, action) {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const updatedState = state.filter((item) => item._id !== action.payload);
      localStorage.setItem(`wish_${userId}`, JSON.stringify(updatedState));
      // Check if the wish is now empty
      if (updatedState.length === 0) {
        localStorage.removeItem(`wish_${userId}`);
      }
      return updatedState;
    },
  },
});

export const { addWish, removeWish, resetWish, setWish } =
  wishListSlice.actions;

export default wishListSlice.reducer;
