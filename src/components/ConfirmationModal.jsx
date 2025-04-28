import { X } from "lucide-react";

export default function ConfirmationModal({ onCancel, onConfirm }) {
  return (
    <div>
      <div>
        <button onClick={onCancel}>
          <X />
        </button>
      </div>
      <h2>Confirm logout</h2>
      <p>Are you sure you want to logout?</p>
      <div>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
}
