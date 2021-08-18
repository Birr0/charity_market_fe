import {createSlice} from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        loadingState : localStorage.getItem('loading') ? JSON.parse(localStorage.getItem('loading')) : localStorage.setItem('loading', false),
    },
    reducers: {
        setLoading: (state, action) => {
            state.loadingState = action.payload.loading;
            localStorage.setItem('loading', action.payload.loading);
            //what is required here?
        }
    }
})

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;