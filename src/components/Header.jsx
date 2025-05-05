import { LogOut } from "lucide-react";
import { Navbar } from "./Navbar";
import { NavLink } from "react-router-dom";
import { remove } from "../storage/remove";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { load } from "../storage/load";
import { useToast } from "../context/ToastContext";

export default function Header() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const activeUser = load("user");
  const { showToast } = useToast();
  const navigate = useNavigate();

  function handleLogout() {
    remove("token");
    remove("user");
    showToast({ message: "Logout successful!", type: "success" });
    navigate("/");
  }

  function handleConfirmation() {
    setShowConfirmation(false);
    handleLogout();
  }

  return (
    <header>
      <div>
        <NavLink to="/" title="Go to home">
          <img
            src="/images/holidaze-logo.png"
            alt="Holidaze logo"
            title="Go to home"
          />
        </NavLink>
        {activeUser && <p>Hello, {activeUser}!</p>}
        <button
          onClick={() => setShowConfirmation(true)}
          title="Click to log out"
        >
          Log out
          <LogOut size={16} />
        </button>
        {showConfirmation && (
          <ConfirmationModal
            title="Logout confirmation"
            message="Are you sure you want to logout?"
            onConfirm={handleConfirmation}
            onCancel={() => setShowConfirmation(false)}
          />
        )}
      </div>
      <Navbar />
    </header>
  );
}
