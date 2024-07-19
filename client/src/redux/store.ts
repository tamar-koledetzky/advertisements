
import adReducer from './ad/ad.slice'
import categoryReducer from './category/category.slice'
import { ThunkAction , UnknownAction, configureStore } from '@reduxjs/toolkit'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authReducer from './auth/auth.slice'

export const store = configureStore({
    reducer: {
        ad: adReducer,
        category: categoryReducer ,
        auth: authReducer
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck:false
    })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<
    Promise<ReturnType> | ReturnType,
    RootState,
    unknown,
    UnknownAction
>