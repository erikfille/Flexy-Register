// dependencies
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// components
import StyledInput from "../StyledInput";
import UploadWidget from "../UploadWidget/UploadWidget";

// Validations
import validation from "./validation";

// Store
import { useLogin } from "../../hooks/useAuth";

// icons
import eyeOutline from "../../assets/icons/EyeOutline.svg";
import eyeOutlineInvisible from "../../assets/icons/EyeOutlineInvisible.svg";

import styles from "./loginWidget.module.css";

export default function LoginWidget(props) {
  const { childProps } = props;
  const [show, setShow] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [incomplete, setIncomplete] = useState(false);

  const [signUp, loginUser] = useLogin((state) => [
    state.signUp,
    state.loginUser,
  ]);

  useEffect(() => {
    if (childProps.type === "signup") {
      Object.values(errors).length ? setIncomplete(true) : setIncomplete(false);
    } else {
      errors.email || errors.password || !userData.email || !userData.password
        ? setIncomplete(true)
        : setIncomplete(false);
    }
  }, [childProps.type, errors, userData]);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...userData,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (childProps.type === "login") loginUser(userData);
    if (childProps.type === "signup") {
      let signUpUserData = {
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        password: userData.password,
        image: userData.image,
      };
      signUp(signUpUserData);
    }
  };

  const imageGetter = (url) => {
    setUserData({ ...userData, image: url });
  };

  return (
    <div
      className={`${styles.container} container d-flex flex-column align-items-center`}
    >
      <div className="col-10 col-md-12 col-xl-8">
        <div className={`${styles.titleContainer} align-items-left`}>
          <h1 className={`${styles.fColor} ${styles.title}`}>¡Bienvenido!</h1>
          <p className={`${styles.fColor} ${styles.subtitle}`}>
            {childProps.subtitle}
          </p>
        </div>
      </div>
      <div className="col-10 col-md-12 col-xl-8">
        {childProps.type === "signup" && (
          <UploadWidget
            label="Subí tu foto de perfil"
            imageGetter={imageGetter}
          />
        )}
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          {childProps.type === "signup" && (
            <div className="d-flex flex-column flex-lg-row mb-2 mb-2">
              <div className="mb-3 w-100">
                <StyledInput
                  placeholder="Nombre y Apellido"
                  field="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                ></StyledInput>
              </div>
            </div>
          )}
          {childProps.type === "signup" && (
            <div className="d-flex flex-column flex-lg-row mb-2 mb-2">
              <div className="mb-3 w-100">
                <StyledInput
                  placeholder="+54 01 0200 000"
                  field="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  type="number"
                  error={errors.phone}
                ></StyledInput>
              </div>
            </div>
          )}
          <div className="d-flex flex-column flex-lg-row mb-2 mb-2">
            <div className="mb-3 w-100">
              <StyledInput
                placeholder="hola@tuemail.com"
                field="email"
                value={userData.email}
                onChange={handleInputChange}
                type="email"
                error={errors.email}
              />
            </div>
          </div>
          <div className="d-flex flex-column flex-sm-row gap-10">
            <div className="mb-3 w-100 position-relative">
              <StyledInput
                placeholder="Ingresa tu contraseña"
                field="password"
                type={show ? "text" : "password"}
                value={userData.password}
                onChange={handleInputChange}
                error={errors.password}
              />
              {show ? (
                <img
                  src={eyeOutlineInvisible}
                  onClick={() => setShow(false)}
                  className={styles.showPassword}
                />
              ) : (
                <img
                  src={eyeOutline}
                  onClick={() => setShow(true)}
                  className={styles.showPassword}
                />
              )}
            </div>
          </div>
          <div className={styles.forgotPassword}>
            <a onClick={() => forgotPasswordModal}>¿Olvidaste tu contraseña?</a>
          </div>
          <button
            className={`w-100 my-3 ${styles.button}`}
            disabled={incomplete}
          >
            {childProps.button}
          </button>
        </form>
      </div>
      <div className="text-center mt-3 mb-5">
        <span className={`${styles.fColor} ${styles.switcher}`}>
          {childProps.message}
          <Link to={childProps.anchorPath}>
            <span className={styles.linkColor}>
              {" "}
              {childProps.accountAnchor}
            </span>
          </Link>
        </span>
      </div>
    </div>
  );
}
