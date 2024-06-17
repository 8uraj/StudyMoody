import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setTotalItems(state, value) {
      state.totalItems = value.payload;
    },
    setcart(state,value){
      state.cart=value.payload;
    }
  },
});

export const { setTotalItems,setcart } = cartSlice.actions;
export default cartSlice.reducer;
