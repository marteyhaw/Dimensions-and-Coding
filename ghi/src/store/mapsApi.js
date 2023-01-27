import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApiSlice } from "./authApi";

export const mapsApiSlice = createApi({
  reducerPath: "maps",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_DNC_API,
    prepareHeaders: (headers, { getState }) => {
      const selector = authApiSlice.endpoints.getToken.select();
      const { data: tokenData } = selector(getState());
      if (tokenData && tokenData.access_token) {
        headers.set("Authorization", `Bearer ${tokenData.access_token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Account",
    "Token",
    "Characters",
    "Character",
    "CharacterDetails",
    "Map",
  ],
  endpoints: (builder) => ({
    getMap: builder.query({
      query: (quest_id) => `maps/${quest_id}`,
      providesTags: ["Map"],
    }),
  }),
});

export const { usegetMapQuery } = mapsApiSlice;
