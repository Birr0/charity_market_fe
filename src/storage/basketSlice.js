import { red } from "@material-ui/core/colors";
import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
    name: 'basket',
    initialState:{
        cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : localStorage.setItem('cart', JSON.stringify({'total': 0, 'shipping': 0, 'lineItems': []})),
        buyNowItem: localStorage.getItem('buyNowItem') ? JSON.parse(localStorage.getItem('buyNowItem')) : localStorage.setItem('buyNowItem', JSON.stringify({})), 
    },

    reducers: {
        addToCart: (state, action) => {
            state.cart.lineItems.push(action.payload);
            state.cart.total += Number(action.payload.price);
            localStorage.setItem('cart', JSON.stringify(state.cart));
            //quantity check ; if item already exists in basket. If exists, then add to quantity in lineItem
        },
        deleteFromCart: (state, action) => {
            state.cart.lineItems = state.cart.lineItems.filter(item => 
                item.sku !== action.payload.sku
            );
            state.cart.total -= Number(action.payload.price);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        processCheckout: (state, action) => {
            console.log(action);
            window.location.href = "/payment";
            
        },
        buyNow: (state, action) => {
            console.log(action);
            state.buyNowItem = action.payload;
            localStorage.setItem('buyNowItem', JSON.stringify(state.buyNowItem));
            window.location.href = "/buy-now";
        },
        
    },
})

export const { buyNow, deleteFromCart, addToCart, processCheckout } = basketSlice.actions

export default basketSlice.reducer