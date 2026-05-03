import { configureStore } from '@reduxjs/toolkit'
import { videoApi } from './videoApi'

export const store = configureStore({
  reducer: {
    [videoApi.reducerPath]: videoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(videoApi.middleware),
})
