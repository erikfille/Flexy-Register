import React from "react";
import { useLocation, NavLink } from "react-router-dom";

import LoginWidget from "../../components/LoginWidget/LoginWidget";

import Logo from "/logo.svg";
import hamburguerIcon from "../../assets/icons/hambuguer-icon.svg";
import loginImg from "../../assets/img/inicia-sesión-agente.png";

import styles from "./Login.module.css";

export default function Login() {
  const location = useLocation();

  const actualLocation = location.pathname;

  let childProps = {};

  if (actualLocation === "/login") {
    childProps = {
      type: "login",
      subtitle: "Ingresá tus datos para acceder",
      button: "Ingresar",
      message: "¿No tenés cuenta?",
      accountAnchor: "¡Convertite ahora en un agente Flexy!",
      anchorPath: "/signup",
    };
  }

  if (actualLocation === "/signup") {
    childProps = {
      type: "signup",
      subtitle: "Convertite ahora en un agente Flexy.",
      button: "Registrate",
      message: "¿Ya tenés una cuenta?",
      accountAnchor: "Iniciá sesión",
      anchorPath: "/login",
    };
  }

  return (
    <div className={styles.loginContainer}>
      <div className="row">
        <div
          className={`col-12 col-md-6 col-xl-5 d-flex justify-content-center align-items-center ${styles.formContainer}`}
        >
          <div className={`${styles.logoContainer}`}>
            <NavLink to="#">
              <img src={Logo} alt="FlexyLogo" />
            </NavLink>
            <div
              className={styles.hamburguerIcon}
            >
              <img src={hamburguerIcon} alt="dropdownIcon" width="24px" />
            </div>
          </div>
          <LoginWidget childProps={childProps} />
        </div>
        <div
          className={`col-md-6 col-xl-7 d-s-none d-md-flex position-relative ${styles.imgContainer}`}
        >
          <img src={loginImg} alt="Login Image" />
        </div>
      </div>
    </div>
  );
}
