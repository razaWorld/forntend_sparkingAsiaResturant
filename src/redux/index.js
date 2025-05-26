import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userSliceReducer } from './slices';
import { userApi,resturantApi } from './services';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'], // ✅ Only persist custom slices, not RTK Query cache
};

const rootReducer = combineReducers({
  user: userSliceReducer,
  [userApi.reducerPath]: userApi.reducer, // ✅ RTK Query reducer
  [resturantApi.reducerPath]: resturantApi.reducer, // ✅ RTK Query reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Prevent AsyncStorage serialization warnings
    }).concat(userApi.middleware,resturantApi.middleware),
  devTools: process.env.NODE_ENV !== 'production', // Optional: enable Redux DevTools
});

const persistor = persistStore(store);

export { store, persistor };
