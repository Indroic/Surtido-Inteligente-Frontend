import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Por defecto usa localStorage

import headerReducer from './features/header/HeaderSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['header'], // Solo el slice 'header' será persistido
};

const rootReducer = combineReducers({
  header: headerReducer,
  // otros: otrosReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Define tipos para RootState y AppDispatch para usar con los hooks tipados
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;