import { useState } from "react";

import {
  userNameValidation,
  userLastnameValidation,
  userValidation,
  emailValidation,
  passwordValidation,
} from "../validators/registerValidation.js";

import { register } from "../api/auth.js";

export function RegisterController(navigation) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [nameInput, setNameInput] = useState();
  const [lastnameInput, setLastnameInput] = useState();
  const [userInput, setUserInput] = useState();
  const [mailInput, setMailInput] = useState();
  const [passInput, setPassInput] = useState();
  const [secondPassInput, setSecondPassInput] = useState();

  const handleRegister = async () => {
    if (!nameInput || !userNameValidation(nameInput)) {
      return showAlert("Debe introducir un nombre válido.");
    }

    if (!lastnameInput || !userLastnameValidation(lastnameInput)) {
      return showAlert("Debe introducir unos apellidos válidos");
    }

    if (!userInput || !userValidation(userInput)) {
      return showAlert("Debe introducir un usuario válido");
    }

    if (!mailInput || !emailValidation(mailInput)) {
      return showAlert("Debe introducir un correo electrónico válido");
    }

    if (!passInput || !passwordValidation(passInput)) {
      return showAlert(
        "Debe introducir una contraseña válida: Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo",
      );
    }

    if (secondPassInput !== passInput) {
      return showAlert("La contraseña no es la misma en los dos campos");
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
      const { ok, status } = response;

      if (ok && status === 201) {
        setConfirmVisible(true);
      } else {
        setAlertMessage("El usuario no ha podido ser registrado");
        setAlertVisible(true);
      }
    } catch {
      setAlertMessage("Imposible registrar el usuario, inténtelo más tarde.");
      setAlertVisible(true);
    }
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const closeAlert = () => setAlertVisible(false);

  const closeConfirm = () => {
    setConfirmVisible(false);
    navigation.reset({ index: 0, routes: [{ name: "LoginView" }] });
  };

  return {
    nameInput,
    lastnameInput,
    userInput,
    mailInput,
    passInput,
    secondPassInput,
    setNameInput,
    setLastnameInput,
    setUserInput,
    setMailInput,
    setPassInput,
    setSecondPassInput,
    alertVisible,
    alertMessage,
    confirmVisible,
    handleRegister,
    closeAlert,
    closeConfirm,
  };
}
