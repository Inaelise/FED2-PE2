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
    <div className="overlay items-center">
      <div className="relative p-4 sm:px-8 bg-white font-inter drop-shadow-base max-w-[500px] rounded-xl text-center text-black">
        <div>
          <button onClick={onCancel} className="btn-close">
            <X />
          </button>
        </div>
        <h2 className="text-m font-bold py-6">{title}</h2>
        <p>{message}</p>
        <div className="my-6 flex justify-center gap-16">
          <button
            onClick={onConfirm}
            className="btn-confirm bg-green-500 font-bold text-white hover animate"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="btn-confirm border-2 border-[#00000050] hover animate"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
