import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../api/MainContext";
const LoginScreen = (props) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const mainContext = useContext(MainContext);

  let navigate = useNavigate();

  function handleSubmit() {
    if (username == "1" && pass == "1") {
      mainContext.setUserLogin(true);
      navigate("/", { replace: true });
    } else {
      alert("Anmeldeinformationen sind falsch");
    }
  }
  return (
    <div className="container-login">
      <div class="circle"></div>
      <form class="form">
        <h2 class="form__title">Anmeldung</h2>
        <p class="form__paragraph">
          hast du dich nicht registriert?{" "}
          <a href="#" class="form__link">
            Kontakt hier
          </a>
        </p>
        <div class="form__container">
          <div class="form__group">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="user"
              class="form__input"
              placeholder=" "
            />
            <label for="user" class="form__label">
              Nutzername:
            </label>
            <span class="form__line"></span>
          </div>
          <div class="form__group">
            <input
              type="text"
              id="password"
              class="form__input"
              placeholder=" "
              onChange={(e) => setPass(e.target.value)}
            />
            <label htmlFor="password" class="form__label">
              Passwort:
            </label>
            <span class="form__line"></span>
          </div>
          <input
            onClick={() => handleSubmit()}
            type="submit"
            class="form__submit"
            value="Eintreten"
          />
        </div>
      </form>
    </div>
  );
};

LoginScreen.propTypes = {};

export default LoginScreen;
