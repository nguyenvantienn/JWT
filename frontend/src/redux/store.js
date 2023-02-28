import {configureStore , combineReducers, getDefaultMiddleware} from "@reduxjs/toolkit"

import authReducer from "./authSlice"
import userReducer from "./userSlice"

import {persistStore , persistReducer , FLUSH , REHYDRATE , PAUSE , PERSIST ,PURGE , REGISTER,} from 'redux-persist'
// import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};


// const persistConfig1 = {
//     key: 'user',
//     storage,
// };

const rootReducer = combineReducers({
    auth: authReducer,
    user : userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer) 

export const store =  configureStore({
    reducer:persistedReducer,
    middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActionPaths: [FLUSH , REHYDRATE , PAUSE , PERSIST , PURGE , REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
