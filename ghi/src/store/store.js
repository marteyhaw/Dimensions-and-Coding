import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApiSlice } from "./authApi";
import { accountSlice } from "./accountSlice";
import { charApiSlice } from "./charApi";
import { charSlice } from "./charSlice";
import { mapsApiSlice } from "./mapsApi";
import { mapSlice } from "./mapSlice";

export const store = configureStore({
  reducer: {
    [mapsApiSlice.reducerPath]: mapsApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
    [mapSlice.name]: mapSlice.reducer,
    [charApiSlice.reducerPath]: charApiSlice.reducer,
    [charSlice.name]: charSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(charApiSlice.middleware)
      .concat(mapsApiSlice.middleware),
});

setupListeners(store.dispatch);
