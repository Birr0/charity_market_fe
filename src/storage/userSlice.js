import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        productsViewed: localStorage.getItem('productsViewed') ? JSON.parse(localStorage.getItem('productsViewed')) : localStorage.setItem('productsViewed', JSON.stringify([])),
        categoriesViewed: localStorage.getItem('categoriesViewed') ? JSON.parse(localStorage.getItem('categoriesViewed')) : localStorage.setItem('categoriesViewed', JSON.stringify([])),
        clickThroughs: localStorage.getItem('clickThroughs') ? JSON.parse(localStorage.getItem('clickThroughs')) : localStorage.setItem('clickThroughts', JSON.stringify([{}])),
        searches: localStorage.getItem('searches') ? JSON.parse(localStorage.getItem('searches')) : localStorage.setItem('searches', JSON.stringify([])),
    },

    reducers: {
        addToViewedProducts: (state, action) => {
            let viewedProduct = action.payload;
            state.productsViewed.push(viewedProduct); 
            localStorage.setItem('productsViewed', JSON.stringify(state.productsViewed));
        },
        addToCategoriesViewed: (state, action) => {
            let viewedCategory = action.payload;
            console.log(viewedCategory);
            state.categoriesViewed.push(viewedCategory);
            localStorage.setItem('categoriesViewed', JSON.stringify(state.categoriesViewed));
        },
        addClickThrough: (state, action) => {
            state.clickThroughs += action.payload;
            localStorage.setItem('clickThroughs', JSON.stringify(state.clickThroughs));
        },
        addSearch: (state, action) => {
            console.log(state, action.payload);
            if(state.searches[action.payload.search]){
                state.searches[action.payload.search] += 1
            }
            else{
                let searchEntry = {};
                searchEntry[action.payload.search] = 1;
                state.searches.push(searchEntry);
            }
            
            localStorage.setItem('searches', JSON.stringify(state.searches));
        }
    },
})

export const { addClickThrough, addToViewedProducts, addSearch, addToCategoriesViewed } = userSlice.actions

export default userSlice.reducer