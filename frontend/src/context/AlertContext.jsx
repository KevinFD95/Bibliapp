import React, { createContext, useState, useContext } from "react";
import { Popup } from "../components/PopupComponent.jsx";
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    visible: false,
    title: undefined,
    message: undefined,
  });

  const showAlert = (title, message) => {
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

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Popup
        title={alertState.title}
        message={alertState.message}
        visible={alertState.visible}
        onClose={hideAlert}
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
