import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appConfigSlice from "./slices/appConfigSlice";
import boardSlice from "./slices/boardSlice";
import userSlice from "./slices/userSlice";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/es/storage";
const persistConfig = {
    key: 'ShoppyCard',
    
    storage,
  }

const persistBoard=persistReducer(persistConfig,boardSlice) 
const store=configureStore({
    reducer:{
        user:userSlice,
        appConfig:appConfigSlice,
        board:persistBoard

    },
    middleware: (getDefaultMiddleware) =>
getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
}),
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const persitor = persistStore(store)
export {store,persitor} 