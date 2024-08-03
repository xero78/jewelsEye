import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  wishlistState: [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlistItem: (state, action) => {
      const existingIndex = state.wishlistState.findIndex(
        item => item.skuName === action.payload.skuName,
      );
      if (existingIndex >= 0) {
        state.wishlistState.splice(existingIndex, 1);
      } else {
        state.wishlistState.push(action.payload);
      }
    },
  },
});

export const {toggleWishlistItem} = wishlistSlice.actions;

export default wishlistSlice.reducer;
