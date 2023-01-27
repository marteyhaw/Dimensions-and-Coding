import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop_items: "",
};

export const shopSlice = createSlice({
  name: "shopItems",
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

export const { clearForm, updateField, showModal } = shopSlice.actions;
