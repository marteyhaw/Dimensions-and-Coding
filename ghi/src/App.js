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
import CharacterSelect from "./CharacterSelectPage.js";
import MapUI from "./Maps/MapUI.js";

// import { useGetTokenQuery } from "./store/authApi";

import DashBoard from "./Dashboard.js";
import CharacterDetailsPage from "./CharacterDetailsPage.js";

function App() {
  // const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  // if (tokenLoading) {
  //   return <progress className="progress is-primary" max="100"></progress>;
  // }

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

            <Route path="dashboard" element={<DashBoard />} />
            <Route path="createCharacterTest" element={<CharacterFormTwo />} />
            <Route path="selectCharacter" element={<CharacterSelect />} />
            <Route path="characterDetails" element={<CharacterDetailsPage />} />
            <Route path="map" element={<MapUI />} />
            {/* <Route path="questions" element={<QuestionsDetails />} /> */}
          </Route>
          <Route
            path="*"
            element={
              <div
                className="container"
                style={{ padding: "1rem", maxWidth: "250px" }}
              >
                <p className="w-2 alert alert-danger text-center">
                  There's nothing here!
                </p>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
