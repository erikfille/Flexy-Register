var EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var PASSWORD_REGEX = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,12}$/;

export default function validation(inputs) {
  const errors = {};
  if (!EMAIL_REGEX.test(inputs.email) || !inputs.email) {
    errors.email = "Debe introducir un email válido";
  }
  if (!inputs.name) errors.name = "Debes introducir un nombre";
  else if (inputs.name.length > 25) {
    errors.name = "El nombre no puede ser mayor a 25 caracteres";
  }
  if (!inputs.phone) errors.phone = "Debes introducir un numero de teléfono";
  if (!PASSWORD_REGEX.test(inputs.password)) {
    errors.password = "Debe tener al menos 8 caracteres";
  }
  return errors;
}
