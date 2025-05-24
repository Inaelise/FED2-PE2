import { CirclePlus, CircleUser, Hotel, X, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { load } from "../storage/load";
import { useState, useEffect, useRef } from "react";
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
  const menuRef = useRef(null);

  const navLinks = (
    <>
      <li title="Go to home">
        <NavLink
          to="/"
          onClick={() => setOpenMenu(false)}
          className={({ isActive }) =>
            `flex items-center gap-1 hover:text-orange animate ${
              isActive ? "text-orange" : "text-green"
            }`
          }
        >
          <Hotel size={16} strokeWidth={2.5} /> Venues
        </NavLink>
      </li>
      <li title="Go to profile">
        <NavLink
          to="profile"
          onClick={() => setOpenMenu(false)}
          className={({ isActive }) =>
            `flex items-center gap-1 hover:text-orange animate ${
              isActive ? "text-orange" : "text-green"
            }`
          }
        >
          <CircleUser size={16} strokeWidth={2.5} /> Profile
        </NavLink>
      </li>
      {venueManager && (
        <li title="Go to create venue">
          <NavLink
            to="create-venue"
            onClick={() => setOpenMenu(false)}
            className={({ isActive }) =>
              `flex items-center gap-1 hover:text-orange animate ${
                isActive ? "text-orange" : "text-green"
              }`
            }
          >
            <CirclePlus size={16} strokeWidth={2.5} /> Add venue
          </NavLink>
        </li>
      )}
    </>
  );

  /* Closes dropdown menu on click outside */
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

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
          <div
            ref={menuRef}
            className={`fixed right-0 top-12 w-[190px] bg-beige rounded-bl-xl shadow-md z-50 md:hidden transition-all duration-400 ease-in-out transform ${
              openMenu
                ? "translate-x-0"
                : "translate-x-full pointer-events-none"
            }`}
          >
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

          {/* Desktop menu */}
          <ul className="hidden md:flex md:justify-center md:gap-18 md:p-1 bg-white drop-shadow-base">
            {activeUser && navLinks}
          </ul>
        </div>
      )}
    </nav>
  );
}
