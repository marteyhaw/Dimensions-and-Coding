import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApiSlice } from "./authApi";

export const quesApiSlice = createApi({
  reducerPath: "ques",
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
    "Answer",
  ],
  endpoints: (builder) => ({
    getQuestionAnswer: builder.mutation({
      query: (getParams) => ({
        url: `/questions/answer/?question_id=${getParams.quest_id}&character_id=${getParams.character_id}&char_answer=${getParams.char_answer}`,
        method: "post",
        body: {},
        credentials: "include",
      }),
      providesTags: ["Answer"],
      invalidatesTags: ["CharacterDetails"],
    }),
  }),
});

export const { useGetQuestionAnswerMutation } = quesApiSlice;
