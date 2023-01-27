import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApiSlice } from "./authApi";

export const shopApiSlice = createApi({
  reducerPath: "shop",
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
    "Answer",
    "ShopItems",
  ],
  endpoints: (builder) => ({
    purchaseItem: builder.mutation({
      query: (data) => ({
        url: `/inventories/${data.character_id}?item_id=${data.item_id}`,
        method: "post",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["CharacterDetails"],
    }),
    getShopItems: builder.query({
      query: (shop_id) => `/shops/${shop_id}`,
      providesTags: ["ShopItems"],
      invalidatesTags: ["CharacterDetails"],
    }),
  }),
});

export const { useGetShopItemsQuery, usePurchaseItemMutation } = shopApiSlice;
