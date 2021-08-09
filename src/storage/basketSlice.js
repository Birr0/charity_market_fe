import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
    name: 'basket',
    initialState:{
        value: localStorage.getItem('count') ? Number(localStorage.getItem('count')) : 0,
        lineItems: localStorage.getItem('lineItems') ? localStorage.getItem('lineItems') : [],
    },
    reducers: {
        increment: (state) => {

            localStorage.setItem('count', state.value += 1)
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        addLineItem: (state, action) => {
            //console.log(JSON.stringify(action.payload));
            
            localStorage.setItem('lineItems', action.payload)
        },
    },
})

export const { increment, decrement, incrementByAmount, addLineItem } = basketSlice.actions

export default basketSlice.reducer