export const saveToStorage = (storageId, item) =>
  window.sessionStorage.setItem(storageId, JSON.stringify(item));

export const getFromStorage = (storageId) =>
  JSON.parse(window.sessionStorage.getItem(storageId));

export const deleteFromStorage = (storageId) =>
  window.sessionStorage.removeItem(storageId);
