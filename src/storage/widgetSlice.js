import {createSlice} from "@reduxjs/toolkit";

export const widgetSlice = createSlice({
    name: 'widget',
    initialState: {
        backdropState : localStorage.getItem('_bd') ? JSON.parse(localStorage.getItem('_bd')) : localStorage.setItem('_bd', false),
        catalogueBackdropState: localStorage.getItem('cat_bd') ? JSON.parse(localStorage.getItem('cat_bd')) : localStorage.setItem('cat_bd', false),
    },
    reducers: {
        setBackdrop: (state, action) => {
            state.backdropState = action.payload;
            console.log(state, action);
            localStorage.setItem('_bd', action.payload);
            //what is required here?
        },
        setCatalogueBackdrop: (state, action) => {
            state.catalogueBackdropState = action.payload;
            console.log(state, action);
            localStorage.setItem('cat_bd', action.payload);
        }
    }
})

export const { setBackdrop, setCatalogueBackdrop } = widgetSlice.actions;

export default widgetSlice.reducer;