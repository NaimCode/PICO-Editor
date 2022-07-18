import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appConfigSlice from "./slices/appConfigSlice";
import boardSlice from "./slices/boardSlice";
import userSlice from "./slices/userSlice";


const store=configureStore({
    reducer:{
        user:userSlice,
        appConfig:appConfigSlice,
        board:boardSlice

    }
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export {store} 