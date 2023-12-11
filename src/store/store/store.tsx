import { configureStore } from "@reduxjs/toolkit";
import uiSlices from "../slices/uiSlices";
import managementSlice from "../slices/managementSlice";

const store = configureStore({
    reducer: {
        ui: uiSlices,
        management: managementSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store
