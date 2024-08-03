import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import wishlistReducer from './wishlistSlice';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, wishlistReducer);
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
