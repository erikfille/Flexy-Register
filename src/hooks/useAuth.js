import { create } from "zustand";
import { useModal } from "./useModals";
import { saveToStorage, getFromStorage } from "../utils/storageManagement";

export const useLogin = create((set, get) => ({
  user: {},
  signUp: (userData) => {
    const { loginHi } = get();

    let simulatedDatabase = getFromStorage("simulatedDatabase");

    set((state) => ({ user: userData }));

    let newDatabase = [];

    if (simulatedDatabase?.length) newDatabase = simulatedDatabase;

    newDatabase.push(userData);

    console.log("New Database", newDatabase);

    saveToStorage("simulatedDatabase", newDatabase);

    loginHi(userData, "¡Registro exitoso!");
  },
  loginUser: (userData) => {
    const { loginHi } = get();
    const modal = useModal.getState().setModalInfo;

    console.log("User Data", userData);

    let simulatedDatabase = getFromStorage("simulatedDatabase");

    console.log("recovered Database", simulatedDatabase);

    let loggedUser = simulatedDatabase.find(
      (user) => user.email === userData.email
    );

    if (!loggedUser) {
      modal("Error", `El usuario ${userData.email} no existe`, () => {}, []);
    } else {
      if (loggedUser.password === userData.password) {
        loginHi(loggedUser, "¡Login exitoso!");
      } else {
        modal("Error", `La contraseña ingresada no es válida`, () => {}, []);
      }
    }
  },
  loginHi(user, title) {
    const modal = useModal.getState().setModalInfo;
    modal(
      title,
      `¡Bienvenido a Flexy, ${user.name}!`,
      () => {},
      []
    );
  },
}));
