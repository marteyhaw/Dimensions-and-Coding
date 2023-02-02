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
      [200, 750, Goblin3],
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
      [200, 750, Goblin3],
    ],
  },
  quest3object: {
    map_path: map1,
    map_size: {
      w: "100%",
      h: "100%",
    },
    encounter: {
      x: 200,
      y: 750,
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
      [330, 760, FrostGoblin],
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
      y: 760,
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
      [330, 760, FrostGoblin],
    ],
  },

  quest7object: {
    map_path: map2,
    map_size: {
      w: "100%",
      h: "100%",
    },
    encounter: {
      x: 645,
      y: 850,
      img_path: Lizardman,
    },
    iconsToRender: [
      [465, 200, FireDemon],
      [215, 630, Dragon],
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
      y: 200,
      img_path: FireDemon,
    },
    iconsToRender: [
      [645, 850, Lizardman],
      [215, 630, Dragon],
    ],
  },
  quest9object: {
    map_path: map2,
    map_size: {
      w: "100%",
      h: "100%",
    },
    encounter: {
      x: 215,
      y: 630,
      img_path: Dragon,
    },
    iconsToRender: [
      [645, 850, Lizardman],
      [465, 200, FireDemon],
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
