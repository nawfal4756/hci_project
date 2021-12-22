import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const product = state.products.find(
        (item) => item._id === action.payload._id
      );

      if (product) {
        product.quantity += action.payload.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    changeQuantity: (state, action) => {
      const product = state.products.find(
        (item) => item._id === action.payload.productId
      );

      if (action.payload.type === "dec") {
        product.quantity -= 1;
        state.total -= product.price;
        if (product.quantity <= 0) {
          state.products = state.products.filter(
            (item) => item._id !== product._id
          );
          state.quantity -= 1;
        }
      } else if (action.payload.type === "inc") {
        product.quantity += 1;
        state.total += product.price;
      }
    },
    deleteProduct: (state, action) => {
      state.quantity -= 1;
      const product = state.products.find(
        (item) => item._id === action.payload.productId
      );
      state.total -= product.price * product.quantity;
      state.products = state.products.filter(
        (item) => item._id !== action.payload.productId
      );
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, changeQuantity, deleteProduct, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
