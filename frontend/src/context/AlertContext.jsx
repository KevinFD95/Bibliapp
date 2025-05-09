import React, { createContext, useState, useContext } from "react";
import { Popup, ConfirmPopup } from "../components/PopupComponent.jsx";
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    visible: false,
    title: undefined,
    message: undefined,
  });
  const [confirmState, setConfirmState] = useState({
    visible: false,
    title: undefined,
    message: undefined,
  });

  const showAlert = ({ title, message }) => {
    setAlertState({
      visible: true,
      title,
      message,
    });
  };

  const hideAlert = () => {
    setAlertState({
      visible: false,
      title: undefined,
      message: undefined,
    });
  };

  const showConfirm = ({ title, message, onConfirm }) => {
    setConfirmState({
      visible: true,
      title,
      message,
      onConfirm,
    });
  };

  const hideConfirm = () => {
    setConfirmState({
      visible: false,
      title: undefined,
      message: undefined,
    });
  };

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      <Popup
        title={alertState.title}
        message={alertState.message}
        visible={alertState.visible}
        onClose={hideAlert}
      />
      <ConfirmPopup
        title={confirmState.title}
        message={confirmState.message}
        visible={confirmState.visible}
        onConfirm={() => {
          confirmState.onConfirm?.();
          hideConfirm();
        }}
        onClose={hideConfirm}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export { AlertContext };
