import { createSlice } from "@reduxjs/toolkit";
import map1 from "../Maps/MapImages/map1.png";
import map2 from "../Maps/MapImages/map2.png";
import map3 from "../Maps/MapImages/map3.png";
import Goblin1 from "../Maps/MapImages/Goblin1.png";
import Goblin2 from "../Maps/MapImages/Goblin2.png";
import Goblin3 from "../Maps/MapImages/Goblin3.png";
import Lizardman from "../Maps/MapImages/Lizardman.png";
import FireDemon from "../Maps/MapImages/FireDemon.png";
import Dragon from "../Maps/MapImages/Dragon.png";
import FrostGoblin from "../Maps/MapImages/FrostGoblin.png";
import DeathKnight from "../Maps/MapImages/DeathKnight.png";
import ElementalDemon from "../Maps/MapImages/ElementalDemon.png";

const initialState = {
  quest1object: {
    map_path: map1,
    map_size: {
      w: "100%",
      h: "100%",
    },
    encounter: {
      x: 810,
      y: 370,
      img_path: Goblin1,
    },
    iconsToRender: [
      [900, 940, Goblin2],
      [250, 1000, Goblin3],
    ],
  },
  quest2object: {
    map_path: map1,
    map_size: {
      w: "100%",
      h: "100%",
    },
    encounter: {
      x: 900,
      y: 940,
      img_path: Goblin2,
    },
    iconsToRender: [
      [810, 370, Goblin1],
      [250, 1000, Goblin3],
    ],
  },
  quest3object: {
    map_path: map1,
    map_size: {
      w: "100%",
      h: "100%",
    },
    encounter: {
      x: 250,
      y: 1000,
      img_path: Goblin3,
    },
    iconsToRender: [
      [810, 370, Goblin1],
      [900, 940, Goblin2],
    ],
  },
  quest4object: {
    map_path: map3,
    map_size: {
      w: "100%",
      h: "100%",
    },
    encounter: {
      x: 760,
      y: 500,
      img_path: DeathKnight,
    },
    iconsToRender: [
      [330, 810, FrostGoblin],
      [150, 215, ElementalDemon],
    ],
  },
  quest5object: {
    map_path: map3,
    map_size: {
      w: "100%",
      h: "100%",
    },
    encounter: {
      x: 330,
      y: 810,
      img_path: FrostGoblin,
    },
    iconsToRender: [
      [760, 500, DeathKnight],
      [150, 215, ElementalDemon],
    ],
  },
  quest6object: {
    map_path: map3,
    map_size: {
      w: "100%",
      h: "100%",
    },
    encounter: {
      x: 150,
      y: 215,
      img_path: ElementalDemon,
    },
    iconsToRender: [
      [760, 500, DeathKnight],
      [330, 810, FrostGoblin],
    ],
  },

  quest7object: {
    map_path: map2,
    map_size: {
      w: "100%",
      h: "100%",
    },
    encounter: {
      x: 575,
      y: 1150,
      img_path: Lizardman,
    },
    iconsToRender: [
      [465, 525, FireDemon],
      [255, 945, Dragon],
    ],
  },
  quest8object: {
    map_path: map2,
    map_size: {
      w: "100%",
      h: "100%",
    },
    encounter: {
      x: 465,
      y: 525,
      img_path: FireDemon,
    },
    iconsToRender: [
      [575, 1150, Lizardman],
      [255, 945, Dragon],
    ],
  },
  quest9object: {
    map_path: map2,
    map_size: {
      w: "100%",
      h: "100%",
    },
    encounter: {
      x: 255,
      y: 945,
      img_path: Dragon,
    },
    iconsToRender: [
      [575, 1150, Lizardman],
      [465, 525, FireDemon],
    ],
  },
};

export const mapSlice = createSlice({
  name: "map",
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

export const { clearForm, updateField, showModal } = mapSlice.actions;
