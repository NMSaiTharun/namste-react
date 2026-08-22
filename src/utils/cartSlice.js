import { createSlice } from "@reduxjs/toolkit";

// Every menu item is a Swiggy card object; its id is the stable identity we
// use to group duplicates into a single cart line with a quantity.
export const getItemId = (item) => item?.card?.info?.id;

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  // addItem is an action ->()=> - this is reducer function with a name addItem, that maps to addItem function
  // reducers is an object
  reducers: {
    addItem: (state, action) => {
      //mutating the state here
      const id = getItemId(action.payload);
      const existingItem = state.items.find((item) => getItemId(item) === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Accepts either the item object or a raw id. Drops the line entirely
    // once its quantity would fall to zero.
    removeItem: (state, action) => {
      const id = getItemId(action.payload) ?? action.payload;
      const index = state.items.findIndex((item) => getItemId(item) === id);
      if (index === -1) return;
      if (state.items[index].quantity > 1) {
        state.items[index].quantity -= 1;
      } else {
        state.items.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

// Total units in the cart, as opposed to the number of distinct lines.
export const selectCartCount = (store) =>
  store.cart.items.reduce((total, item) => total + item.quantity, 0);

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
