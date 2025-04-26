import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterModal({ onClose, switchModal }) {
  return (
    <div>
      <button onClick={onClose}>
        <X />
      </button>
      <h1>Register</h1>
      <div>
        <p>Already have an account?</p>
        <p onClick={() => switchModal("login")}>Login here</p>
      </div>
      <form>
        <div>
          <input type="checkbox" id="manager" name="manager" />
          <label htmlFor="manager">Venue manager</label>
        </div>
        <label htmlFor="name">name</label>
        <input type="name" id="name" name="name" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
