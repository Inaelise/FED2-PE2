import { CirclePlus, CircleUser, Hotel, X, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { load } from "../storage/load";
import { useState } from "react";
import { LogOut } from "lucide-react";

/**
 * The navbar component that displays navigation links and a hamburger menu for mobile devices.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
export function Navbar({ activeUser, onMobileLogout }) {
  const [openMenu, setOpenMenu] = useState(false);
  const venueManager = load("status");

  const navLinks = (
    <>
      <li title="Go to home">
        <NavLink
          to="/"
          onClick={() => setOpenMenu(false)}
          className="flex items-center gap-1 hover:text-orange animate"
        >
          <Hotel size={16} strokeWidth={2.5} /> Venues
        </NavLink>
      </li>
      <li title="Go to profile">
        <NavLink
          to="profile"
          onClick={() => setOpenMenu(false)}
          className="flex items-center gap-1 hover:text-orange animate"
        >
          <CircleUser size={16} strokeWidth={2.5} /> Profile
        </NavLink>
      </li>
      {venueManager && (
        <li title="Go to create venue">
          <NavLink
            to="create-venue"
            onClick={() => setOpenMenu(false)}
            className="flex items-center gap-1 hover:text-orange animate"
          >
            <CirclePlus size={16} strokeWidth={2.5} /> Add venue
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="relative text-green font-semibold md:font-normal">
      {activeUser && (
        <div>
          {/* Hamburger menu */}
          <div className="md:hidden mr-2">
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {openMenu ? (
                <X size={24} strokeWidth={2.5} />
              ) : (
                <Menu size={24} strokeWidth={2.5} />
              )}
            </button>
          </div>

          {/* Mobile dropdown menu */}
          {openMenu && (
            <div className="absolute right-0 top-10 w-[190px] bg-beige rounded-b-xl shadow-md z-50 md:hidden">
              <ul className="flex flex-col gap-6 py-4 px-10 md:hidden">
                {activeUser && navLinks}
                {activeUser && (
                  <li>
                    <button
                      onClick={() => {
                        setOpenMenu(false);
                        onMobileLogout();
                      }}
                      className="flex items-center gap-1"
                    >
                      <LogOut size={16} strokeWidth={2.5} /> Log out
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Desktop menu */}
          <ul className="hidden md:flex md:justify-center md:gap-18 md:p-2 bg-white drop-shadow-base">
            {activeUser && navLinks}
          </ul>
        </div>
      )}
    </nav>
  );
}
