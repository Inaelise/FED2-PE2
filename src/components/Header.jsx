import { LogOut } from "lucide-react";
import { Navbar } from "./Navbar";
import { NavLink } from "react-router-dom";

export default function Header() {
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
        {/*Replace with logged in user*/}
        <p>Hello, username!</p>
        <button title="Click to log out">
          Log out
          <LogOut size={16} />
        </button>
      </div>
      <Navbar />
    </header>
  );
}
