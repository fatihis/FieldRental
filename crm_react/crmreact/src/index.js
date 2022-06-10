import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.min.css";

import MainTemplate from "./components/templates/MainTemplate";
import Home from "./pages/Home";
import PersonalMain from "./pages/PersonalMain";
import AddWorkerPage from "./pages/AddWorkerPage";
import AddVehicle from "./pages/AddVehicle";
import VehicleMain from "./pages/VehicleMain";
import PersonalEdit from "./pages/PersonalEdit";
import { MainContextProvider } from "./api/MainContext";
import LoginScreen from "./pages/Login";
import VehicleEdit from "./pages/VehicleEdit";
import PersonalSearch from "./pages/PersonalSearch";
import VehicleSearch from "./pages/VehicleSearch";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginScreen />} />
          <Route path="/" element={<MainTemplate />}>
            <Route index element={<Home />} />
            <Route path="personal" element={<PersonalMain />} />
            <Route path="personal-anlegen" element={<AddWorkerPage />} />
            <Route path="fuhrpark" element={<VehicleMain />} />
            <Route path="fahrzeug-anlegen" element={<AddVehicle />} />
            <Route path="benutzerverwaltung/:id" element={<PersonalEdit />} />
            <Route path="fahrzeug-berarbeiten/:id" element={<VehicleEdit />} />
            <Route path="benutzerverwaltung" element={<PersonalSearch />} />
            <Route path="fahrzeug-berarbeiten/" element={<VehicleSearch />} />

            {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </MainContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
