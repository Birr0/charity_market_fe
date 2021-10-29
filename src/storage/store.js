import {configureStore} from "@reduxjs/toolkit";
import basketReducer from "./basketSlice";
import loadingReducer from "./loadingSlice";
import managementReducer from "./managementSlice";
import widgetReducer from "./widgetSlice";
import userReducer from "./userSlice";

export default configureStore({
    reducer: {
        basket: basketReducer,
        loading: loadingReducer,
        management: managementReducer,
        widget: widgetReducer,
        user: userReducer
    },
})