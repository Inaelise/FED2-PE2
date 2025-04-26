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

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
      <button onClick={() => setIsOpen(true)}>
        <LogIn size={16} strokeWidth={1.5} />
        Login
      </button>
      {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
      <button>
        <UserRoundPlus size={16} strokeWidth={1.5} />
        Register
      </button>
    </nav>
  );
}
