import {
  CirclePlus,
  CircleUser,
  Hotel,
  LogIn,
  UserRoundPlus,
} from "lucide-react";
import { NavLink } from "react-router";
import { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

/**
 * The navbar component that contains links to different pages and modals for login and registration.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
export function Navbar() {
  const [openModal, setOpenModal] = useState(null);

  const switchModal = (modal) => {
    setOpenModal(modal);
  };

  return (
    <nav>
      <ul>
        <li title="Go to home">
          <NavLink to="/">
            <Hotel size={16} strokeWidth={1.5} /> Venues
          </NavLink>
        </li>
        <li title="Go to profile">
          <NavLink to="profile">
            <CircleUser size={16} strokeWidth={1.5} /> Profile
          </NavLink>
        </li>
        <li title="Go to create venue">
          <NavLink to="create-venue">
            <CirclePlus size={16} strokeWidth={1.5} /> Add venue
          </NavLink>
        </li>
      </ul>
      <button onClick={() => setOpenModal("login")}>
        <LogIn size={16} strokeWidth={1.5} />
        Login
      </button>
      <button onClick={() => setOpenModal("register")}>
        <UserRoundPlus size={16} strokeWidth={1.5} />
        Register
      </button>
      {openModal === "login" && (
        <LoginModal
          onClose={() => setOpenModal(null)}
          switchModal={switchModal}
        />
      )}

      {openModal === "register" && (
        <RegisterModal
          onClose={() => setOpenModal(null)}
          switchModal={switchModal}
        />
      )}
    </nav>
  );
}
