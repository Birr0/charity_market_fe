import { createSlice } from "@reduxjs/toolkit";

export const managementSlice = createSlice({
    name: 'management',
    initialState:{
        query: localStorage.getItem('query') ? JSON.parse(localStorage.getItem('query')) : localStorage.setItem('query', null),
         
    },

    reducers: {
        createSluiceboxQuery: (state, action) => {
            state.query = action.payload.query;
            localStorage.setItem('cart', JSON.stringify(state.query));
        }
    }
})

export const { createSluiceboxQuery } = managementSlice.actions

export default managementSlice.reducer