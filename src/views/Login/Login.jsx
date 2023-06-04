import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import LoginWidget from "../../components/LoginWidget/LoginWidget";
import loginImg from "../../assets/img/inicia-sesión-agente.png";
import Logo from "/logo.svg";

import styles from "./Login.module.css";

export default function Login() {
  const location = useLocation();

  const actualLocation = location.pathname;

  let childProps = {};

  if (actualLocation === "/login") {
    childProps = {
      type: "login",
      subtitle: "Ingrese sus datos para acceder",
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
          className={`col-12 col-md-5 col-xl-4 d-flex justify-content-center align-items-center ${styles.formContainer} mt-4`}
        >
          <div
            className={`row position-absolute top-0 start-0 p-4 ${styles.logoContainer}`}
          >
            <NavLink to="#">
              <img src={Logo} alt="FlexyLogo" width="90px" />
            </NavLink>
          </div>
          <LoginWidget childProps={childProps} />
        </div>
        <div
          className={`col-8 col-md-7 col-xl-8 d-none d-md-flex position-relative ${styles.imgContainer}`}
          style={{
            backgroundImage: `url(${loginImg})`,
          }}
        ></div>
      </div>
    </div>
  );
}
