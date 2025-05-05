import { X } from "lucide-react";
import { useEffect } from "react";

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
