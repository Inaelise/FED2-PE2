import { LogOut } from "lucide-react";
import { Navbar } from "./Navbar";

export function Header() {
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
        <button>
          Log out
          <LogOut size={16} />
        </button>
      </div>
      <Navbar />
    </header>
  );
}
