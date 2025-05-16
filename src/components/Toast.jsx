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
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`fixed top-4 right-0 left-0 mx-auto max-w-[300px] z-50 text-white px-6 py-2 rounded drop-shadow-s ${bgColor}`}
    >
      <button onClick={onClose} className="btn-close">
        <X />
      </button>
      <p className="py-2 mt-2">{message}</p>
    </div>
  );
}
