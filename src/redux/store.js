import {configureStore} from "@reduxjs/toolkit";
import {campersReducer} from "./campersSlice.js";
import {filterReducer} from "./filterSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "campersData",
    storage,
};

const persistedReducer = persistReducer(persistConfig, campersReducer);

export const store = configureStore({
    reducer: {
        campersData: persistedReducer,
        filters: filterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);