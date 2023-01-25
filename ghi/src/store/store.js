import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApiSlice } from "./authApi";
import { accountSlice } from "./accountSlice";
import { charApiSlice } from "./charApi";
import { charSlice } from "./charSlice";

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
    [charApiSlice.reducerPath]: charApiSlice.reducer,
    [charSlice.name]: charSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(charApiSlice.middleware),
});

setupListeners(store.dispatch);
