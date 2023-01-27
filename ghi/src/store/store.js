import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApiSlice } from "./authApi";
import { accountSlice } from "./accountSlice";
import { charApiSlice } from "./charApi";
import { charSlice } from "./charSlice";
import { mapsApiSlice } from "./mapsApi";
import { mapSlice } from "./mapSlice";
import { shopApiSlice } from "./shopApi";
import { shopSlice } from "./shopSlice";
import { quesApiSlice } from "./quesApi";
import { quesSlice } from "./quesSlice";

export const store = configureStore({
  reducer: {
    [mapsApiSlice.reducerPath]: mapsApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
    [mapSlice.name]: mapSlice.reducer,
    [charApiSlice.reducerPath]: charApiSlice.reducer,
    [charSlice.name]: charSlice.reducer,
    [shopApiSlice.reducerPath]: shopApiSlice.reducer,
    [shopSlice.name]: shopSlice.reducer,
    [quesApiSlice.reducerPath]: quesApiSlice.reducer,
    [quesSlice.name]: quesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(charApiSlice.middleware)
      .concat(mapsApiSlice.middleware)
      .concat(quesApiSlice.middleware)
      .concat(shopApiSlice.middleware),
});

setupListeners(store.dispatch);
