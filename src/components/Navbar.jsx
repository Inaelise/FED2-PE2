import { CirclePlus, CircleUser, Hotel } from "lucide-react";

export function Navbar() {
  return (
    <nav>
      <ul>
        <li title="Go to home">
          <Hotel size={16} strokeWidth={1.5} /> Venues
        </li>
        <li title="Go to profile">
          <CircleUser size={16} strokeWidth={1.5} /> Profile
        </li>
        <li title="Go to create venue">
          <CirclePlus size={16} strokeWidth={1.5} /> Add venue
        </li>
      </ul>
    </nav>
  );
}
