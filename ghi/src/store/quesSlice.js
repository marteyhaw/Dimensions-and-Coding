import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question: "",
  option_1: "",
  option_2: "",
  option_3: "",
};

export const quesSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    showModal: (state, action) => {
      state.show = action.payload;
    },
    clearForm: () => {
      return initialState;
    },
  },
});

export const { clearForm, updateField, showModal } = quesSlice.actions;
