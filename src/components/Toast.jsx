import { X } from "lucide-react";
import { useEffect } from "react";

/**
 * Toast notification component that displays a temporary message to the user.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} message - The message to display in the toast.
 * @param {Function} onClose - Function to call when the toast is closed.
 * @param {string} [type="success"] - Type of the toast, can be "success" or "error". It determines its css styling.
 * @returns {JSX.Element} - The rendered component.
 */
export default function Toast({ message, onClose, type = "success" }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); //Disappears after 3 seconds.

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`fixed top-4 right-4 z-50 text-white px-4 py-2 rounded shadow ${bgColor}`}
    >
      <button onClick={onClose}>
        <X />
      </button>
      <p>{message}</p>
    </div>
  );
}
