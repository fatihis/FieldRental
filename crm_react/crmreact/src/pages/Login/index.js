import React from "react";
import PropTypes from "prop-types";
import "./index.css";
const LoginScreen = (props) => {
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
            <input type="text" id="user" class="form__input" placeholder=" " />
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
            />
            <label for="password" class="form__label">
              Passwort:
            </label>
            <span class="form__line"></span>
          </div>
          <input type="submit" class="form__submit" value="Eintreten" />
        </div>
      </form>
    </div>
  );
};

LoginScreen.propTypes = {};

export default LoginScreen;
