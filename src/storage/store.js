import {configureStore} from "@reduxjs/toolkit";
import basketReducer from "./basketSlice";
import loadingReducer from "./loadingSlice";
import managementReducer from "./managementSlice";

export default configureStore({
    reducer: {
        basket: basketReducer,
        loading: loadingReducer,
        management: managementReducer
    },
})