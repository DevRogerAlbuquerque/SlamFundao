import React, { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const toastRef = useRef(null);

  const showToast = (options) => {
    toastRef.current?.show(options);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast ref={toastRef} position="center" />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro do ToastProvider");
  }
  return context;
}