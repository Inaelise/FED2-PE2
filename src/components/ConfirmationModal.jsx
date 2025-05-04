import { X } from "lucide-react";

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
