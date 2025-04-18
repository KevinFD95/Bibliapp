// Valida que el nombre solo contenga letras y espacios
function userNameValidation(userName) {
  return /^[a-zA-Z\s]+$/.test(userName);
}

// Valida que el apellido solo contenga letras y espacios
function userLastnameValidation(userLastname) {
  return /^[a-zA-Z\s]+$/.test(userLastname);
}

// Valida que el nombre de usuario solo contenga letras y números
function usernameValidation(username) {
  return /^[a-zA-Z0-9]+$/.test(username);
}

// Valida la estructura del correo electrónico
function emailValidation(email) {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailRegex.test(email);
}

// Valida la contraseña con múltiples requisitos
function passwordValidation(password) {
  if (password.length < 8 || password.length > 30) return false;
  if (/--|['";#/*]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[\W_]/.test(password)) return false;
  return true;
}

// Validación general de usuario (devuelve un objeto con errores si hay)
function userValidation(user) {
  const errors = {};

  if (!userNameValidation(user.user_name || "")) {
    errors.user_name = `Nombre '${user.user_name}' no válido`;
  }

  if (!userLastnameValidation(user.user_lastname || "")) {
    errors.user_lastname = `Apellido(s) '${user.user_lastname}' no válido`;
  }

  if (!usernameValidation(user.username || "")) {
    errors.username = `Usuario '${user.username}' no válido`;
  }

  if (!emailValidation(user.email || "")) {
    errors.email = `Correo electrónico '${user.email}' no válido`;
  }

  if (!passwordValidation(user.user_password || "")) {
    errors.user_password =
      "La contraseña debe contener una minúscula, mayúscula, número y carácter especial";
  }

  return Object.keys(errors).length
    ? { isValid: false, errors }
    : { isValid: true };
}

export {
  userNameValidation,
  userLastnameValidation,
  usernameValidation,
  emailValidation,
  passwordValidation,
  userValidation,
};
