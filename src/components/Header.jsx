import { LogOut } from "lucide-react";
import { Navbar } from "./Navbar";

export default function Header() {
  return (
    <header>
      <div>
        <img
          src="/images/holidaze-logo.png"
          alt="Holidaze logo"
          title="Go to home"
        />
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
