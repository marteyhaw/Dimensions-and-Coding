import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  class_id: "",
  active_character: "",
};

export const charSlice = createSlice({
  name: "character",
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

export const { clearForm, updateField, showModal } = charSlice.actions;
