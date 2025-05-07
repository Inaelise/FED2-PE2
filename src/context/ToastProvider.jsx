import { useState, useCallback } from "react";
import Toast from "../components/Toast";
import { ToastContext } from "./ToastContext";

/**
 * Provides a global context for displaying toast notifications.
 * Wrap your app or component with this provider to allow any child component to trigger toasts via the "showToast" function exposed in "ToastContext".
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} children - Child components that will have access to the toast context.
 * @returns {JSX.Element} - The rendered component.
 */
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(({ message, type }) => {
    setToast({ message, type });
  }, []);

  const handleClose = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
}
