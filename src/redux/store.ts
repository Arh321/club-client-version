// store.ts
import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profile/profileSlice";
import companySlice from "./companySlice/companySlice";

export const store = configureStore({
  reducer: {
    profileSlice: profileSlice,
    companySlice: companySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
  devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
