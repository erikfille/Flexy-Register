import { create } from "zustand";

export const useModal = create((set) => ({
  modalInfoState: false,
  modalInfoProps: {},
  modalInfoActionArgs: {},
  setModalInfo: (title, text, action, args) => {
    if (title && text && action)
      set((state) => ({ modalInfoProps: { title, text, action } }));
    if (args) set((state) => ({ modalInfoActionArgs: args }));
    set((state) => ({ modalInfoState: state.modalInfoState ? false : true }));
  },
}));
