import React, { useState, useEffect } from "react";
import { useModal } from "../../hooks/useModals";
import StyledInput from "../StyledInput";
import style from "./forgotPassModal.module.css";

export default function ForgotPassModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [email, setEmail] = useState("");

  const [modalForgotPassState, setModalForgotPass] = useModal((state) => [
    state.modalForgotPassState,
    state.setModalForgotPass,
  ]);

  useEffect(() => {
    setIsOpen(modalForgotPassState);
  }, [modalForgotPassState]);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div
      className={`${style.modalContainer} col-7 col-md-4 p-3`}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="d-flex flex-column align-items-center gap-10">
        <h1 className={style.title}>Recupera tu contraseña</h1>
        <h4 className={style.text}>
          Indicanos el correo con el que te registraste
        </h4>
        <div className="mb-3 w-100">
          <StyledInput
            placeholder="tu@email.com"
            field="email"
            value={email}
            onChange={handleInputChange}
          ></StyledInput>
        </div>
        <div className="d-flex gap-10">
          <button
            className={`${style.button}`}
            onClick={() => {
              setModalForgotPass();
            }}
          >
            Recuperar Contraseña
          </button>
        </div>
      </div>
    </div>
  );
}
