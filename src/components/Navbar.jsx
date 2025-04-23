import { CirclePlus, CircleUser, Hotel } from "lucide-react";
import { NavLink } from "react-router";

export function Navbar() {
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
    </nav>
  );
}
