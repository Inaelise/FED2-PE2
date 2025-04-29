import { LogOut } from "lucide-react";
import { Navbar } from "./Navbar";
import { NavLink } from "react-router-dom";
import { remove } from "../storage/remove";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { load } from "../storage/load";

export default function Header() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const activeUser = load("user");

  const navigate = useNavigate();

  function handleLogout() {
    remove("token");
    remove("user");
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
            onConfirm={handleConfirmation}
            onCancel={() => setShowConfirmation(false)}
          />
        )}
      </div>
      <Navbar />
    </header>
  );
}
