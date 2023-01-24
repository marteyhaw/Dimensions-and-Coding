import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharacterForm from "./CharacterForm.js";
import CharacterDetails from "./CharacterDetails.js";
import AccountForm from "./AccountForm.js";
import LoginForm from "./LoginForm.js";
import LogoutButton from "./LogoutButton.js";
import Navbars from "./Navbars.js";
import "./App.css";
import React from "react";
import LandingPage from "./Landing";
import "swiper/swiper-bundle.min.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbars />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<AccountForm />} />
          <Route path="/logout" element={<LogoutButton />} />

          <Route path="/characterDetails" element={<CharacterDetails />} />
          <Route path="/createCharacter" element={<CharacterForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
