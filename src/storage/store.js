import {configureStore} from "@reduxjs/toolkit";
import basketReducer from "./basketSlice";
import loadingReducer from "./loadingSlice";

export default configureStore({
    reducer: {
        basket: basketReducer,
        loading: loadingReducer,
    },
})