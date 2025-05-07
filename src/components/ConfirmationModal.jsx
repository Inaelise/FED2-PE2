import { X } from "lucide-react";

/**
 * A confirmation modal component with customizable title, message, and action handlers.
 * @component
 * @param {Object} props - The component props.
 * @param {string} title="Are you sure?" - The title displayed in the modal.
 * @param {string} message="Please confirm your action" - The message displayed in the modal.
 * @param {Function} onCancel - Function to call when the cancel button is clicked.
 * @param {Function} onConfirm - Function to call when the confirm button is clicked.
 * @returns {JSX.Element} - The rendered component.
 */
export default function ConfirmationModal({
  title = "Are you sure?",
  message = "Please confirm your action",
  onCancel,
  onConfirm,
}) {
  return (
    <div>
      <div>
        <button onClick={onCancel}>
          <X />
        </button>
      </div>
      <h2>{title}</h2>
      <p>{message}</p>
      <div>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
}
