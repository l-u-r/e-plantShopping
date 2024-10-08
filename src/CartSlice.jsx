import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
        totalItemCount: 0,
    },
    reducers: {
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ name, image, cost, quantity: 1 });
            }
            state.totalItemCount = state.items.reduce((total, item) => total + item.quantity, 0);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload);
            state.totalItemCount = state.items.reduce((total, item) => total + item.quantity, 0);
        },
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.name === name);
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
            }
            state.totalItemCount = state.items.reduce((total, item) => total + item.quantity, 0);
        },
        totalQuantity: (state) => {
            let counter = 0;
            return counter = state.items.forEach(item => counter += item.quantity);
        },
    },
});

export const { addItem, removeItem, updateQuantity, totalQuantity } = CartSlice.actions;

export default CartSlice.reducer;
