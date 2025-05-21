import {
  userNameValidation,
  userLastnameValidation,
  userValidation,
  emailValidation,
  passwordValidation,
} from "../validators/registerValidation.js";

import { register } from "../api/auth.js";

export async function registerUser(
  nameInput,
  lastnameInput,
  userInput,
  mailInput,
  passInput,
  secondPassInput,
  showAlert,
) {
  if (!nameInput || !userNameValidation(nameInput)) {
    showAlert({
      title: "Error",
      message: "Debe introducir un nombre válido.",
    });
    return false;
  }

  if (!lastnameInput || !userLastnameValidation(lastnameInput)) {
    showAlert({
      title: "Error",
      message: "Debe introducir unos apellidos válidos",
    });
    return false;
  }

  if (!userInput || !userValidation(userInput)) {
    showAlert({
      title: "Error",
      message: "Debe introducir un usuario válido",
    });
    return false;
  }

  if (!mailInput || !emailValidation(mailInput)) {
    showAlert({
      title: "Error",
      message: "Debe introducir un correo electrónico válido",
    });
    return false;
  }

  if (!passInput || !passwordValidation(passInput)) {
    showAlert({
      title: "Error",
      message:
        "Debe introducir una contraseña válida: Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo",
    });
    return false;
  }

  if (secondPassInput !== passInput) {
    showAlert({
      title: "Error",
      message: "La contraseña no es la misma en los dos campos",
    });
    return false;
  }

  const user = {
    user_name: nameInput,
    user_lastname: lastnameInput,
    username: userInput,
    email: mailInput,
    user_password: passInput,
  };

  try {
    const response = await register(user);
    const { ok, status, message } = response;

    if (ok && status === 201) {
      showAlert({
        title: "Éxito",
        message: message,
      });
      return true;
    } else {
      showAlert({
        title: "Error",
        message: message,
      });
      return false;
    }
  } catch {
    showAlert({
      title: "Error",
      message: "Imposible registrar el usuario, inténtelo más tarde.",
    });
    return false;
  }
}
