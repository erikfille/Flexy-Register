import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import StyledInput from "../StyledInput";
import UploadWidget from "../UploadWidget/UploadWidget";

import validation from "./validation";

import { useLogin } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModals";

import eyeOutline from "../../assets/icons/EyeOutline.svg";
import eyeOutlineInvisible from "../../assets/icons/EyeOutlineInvisible.svg";
import imageIcon from "../../assets/icons/image-upload.svg";

import styles from "./loginWidget.module.css";

export default function LoginWidget(props) {
  const { childProps } = props;
  const [show, setShow] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    image: imageIcon,
    imageFlag: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    image: "",
  });

  const [imageFlag, setImageFlag] = useState(false);

  const [incomplete, setIncomplete] = useState(false);

  const [signUp, loginUser] = useLogin((state) => [
    state.signUp,
    state.loginUser,
  ]);

  const [setModalForgotPass] = useModal((state) => [state.setModalForgotPass]);

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

  const updateImage = (img) => {
    sessionStorage.setItem("userProfilePicture", img);
    setUserData({ ...userData, image: img, imageFlag: true });
    setErrors(
      validation({
        ...userData,
        imageFlag: true,
      })
    );
  };

  const forgotPasswordModal = () => {
    setModalForgotPass();
  };

  return (
    <div
      className={`${styles.container} d-flex flex-column align-items-center`}
    >
        <div className={styles.titleContainer}>
          <h1 className={`${styles.fColor} ${styles.title}`}>¡Bienvenido!</h1>
          <p className={`${styles.fColor} ${styles.subtitle}`}>
            {childProps.subtitle}
          </p>
        </div>
      {childProps.type === "signup" && (
        <UploadWidget
          label="Subí tu foto de perfil"
          image={userData.image}
          imageFlag={userData.imageFlag}
          updateImage={updateImage}
          error={errors.image}
        />
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        {childProps.type === "signup" && (
          <StyledInput
            placeholder="Nombre y Apellido"
            field="name"
            value={userData.name}
            onChange={handleInputChange}
            error={errors.name}
          ></StyledInput>
        )}
        {childProps.type === "signup" && (
          <StyledInput
            placeholder="+54 01 0200 000"
            field="phone"
            value={userData.phone}
            onChange={handleInputChange}
            type="number"
            error={errors.phone}
          ></StyledInput>
        )}
        <StyledInput
          placeholder="hola@tuemail.com"
          field="email"
          value={userData.email}
          onChange={handleInputChange}
          type="email"
          error={errors.email}
        />
        <div className={styles.passwordContainer}>
          <StyledInput
            placeholder="Ingresá tu contraseña"
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
        <div className={styles.forgotPassword}>
          <a onClick={() => forgotPasswordModal()}>¿Olvidaste tu contraseña?</a>
        </div>
        <button className={styles.button} disabled={incomplete}>
          {childProps.button}
        </button>
      </form>
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
  );
}
