import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { clearForm } from "./charSlice";
import { authApiSlice } from "./authApi";

export const charApiSlice = createApi({
  reducerPath: "char",
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
  tagTypes: ["Account", "Token", "Characters", "Character", "CharacterDetails"],
  endpoints: (builder) => ({
    createCharacter: builder.mutation({
      query: (data) => ({
        url: `/characters`,
        method: "post",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: [{ type: "Characters", id: "LIST" }],
    }),
    getCharactersList: builder.query({
      query: (user_id) => `/characters/user/${user_id}`,
      providesTags: (data) => {
        const tags = [{ type: "Characters", id: "LIST" }];
        if (!data || !data.char) return tags;

        const { char } = data;
        if (char) {
          tags.concat(...char.map(({ id }) => ({ type: "Characters", id })));
        }
        return tags;
      },
    }),
    getCharacter: builder.query({
      query: (character_id) => `/characters/character/${character_id}`,
      providesTags: ["Character"],
    }),
    getCharacterDetails: builder.query({
      query: (character_id) => `/inventories/${character_id}`,
      providesTags: ["CharacterDetails"],
    }),
  }),
});

export const {
  useCreateCharacterMutation,
  useGetCharactersListQuery,
  useGetCharacterQuery,
  useGetCharacterDetailsQuery,
} = charApiSlice;
