import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist'
import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice'
import pizzaReducer from './slices/pizzasSlice'


const persistConfig = {
  key: 'root',
  storage,
}


const persistedReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: persistedReducer,
    pizza: pizzaReducer
  },
  devTools: true
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch