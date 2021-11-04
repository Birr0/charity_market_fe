import {createSlice} from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        loadingState : localStorage.getItem('loading') ? JSON.parse(localStorage.getItem('loading')) : localStorage.setItem('loading', false),
    },
    reducers: {
        setLoading: (state, action) => {
            state.loadingState = action.payload;
            localStorage.setItem('loading', action.payload);
        }
    }
})

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;