import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountForm from "./AccountForm.js";
import LoginForm from "./LoginForm.js";
import LogoutButton from "./LogoutButton.js";
import Navbars from "./Navbars.js";
import "./App.css";
// import QuestionsDetails from './questions/index.js';
import React from "react";
import LandingPage from "./Landing";
import "swiper/swiper-bundle.min.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import CharacterFormTwo from "./CharacterFormRTK";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbars />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="ground-7-rule">
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<AccountForm />} />
            <Route path="logout" element={<LogoutButton />} />
            <Route path="createCharacterTest" element={<CharacterFormTwo />} />
            {/* <Route path="questions" element={<QuestionsDetails />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
