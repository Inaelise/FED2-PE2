import { LogOut, LogIn, UserRoundPlus } from "lucide-react";
import { Navbar } from "./Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { remove } from "../storage/remove";
import { Suspense, lazy, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { load } from "../storage/load";
import { useToast } from "../context/ToastContext";
import LoadingSpinner from "./LoadingSpinner";

const LoginModal = lazy(() => import("./LoginModal"));
const RegisterModal = lazy(() => import("./RegisterModal"));

/**
 * Header component that displays the site logo, user greeting, navbar, and login/register/logout buttons.
 *
 * @returns {JSX.Element} - The rendered component.
 */
export default function Header() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [openModal, setOpenModal] = useState(null);

  const activeUser = load("user");
  const { showToast } = useToast();
  const navigate = useNavigate();

  /**
   * Handles the logout process by removing the token and user data from storage,
   * showing a success message, and navigating to the home page.
   */
  function handleLogout() {
    remove("token");
    remove("user");
    remove("status");
    showToast({ message: "Logout successful!", type: "success" });
    navigate("/");
  }

  /**
   * Handles the confirmation of the logout action.
   * It sets the confirmation modal to false and calls the handleLogout function.
   */
  function handleConfirmation() {
    setShowConfirmation(false);
    handleLogout();
  }

  const switchModal = (modal) => {
    setOpenModal(modal);
  };

  return (
    <header className="bg-beige text-green fixed top-0 left-0 right-0 z-10 shadow-md flex items-center justify-between font-poppins md:block">
      {activeUser ? (
        <div className="flex items-center justify-between py-1 px-4 w-full">
          <NavLink to="/" title="Go to home">
            <img
              className="object-contain w-32 md:w-40 ml-2"
              src="/images/holidaze-logo.png"
              alt="Holidaze logo"
              title="Go to home"
            />
          </NavLink>
          <p className="hidden text-sm sm:block pr-[30%] md:pr-0">
            Hello, {activeUser}!
          </p>
          <button
            className="items-center gap-1 font-semibold hidden md:flex cursor-pointer hover:text-orange animate"
            onClick={() => setShowConfirmation(true)}
            title="Click to log out"
          >
            Log out
            <LogOut size={16} />
          </button>
          {showConfirmation && (
            <ConfirmationModal
              title="Logout confirmation"
              message="Are you sure you want to logout?"
              onConfirm={handleConfirmation}
              onCancel={() => setShowConfirmation(false)}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between py-2 w-full">
          <NavLink to="/" title="Go to home">
            <img
              className="object-contain w-32 md:w-40 ml-2"
              src="/images/holidaze-logo.png"
              alt="Holidaze logo"
              title="Go to home"
            />
          </NavLink>
          <div className="flex gap-2 sm:gap-8">
            <button
              className="btn-auth bg-orange animate"
              onClick={() => setOpenModal("login")}
            >
              <LogIn size={16} strokeWidth={2} />
              Login
            </button>
            <button
              className="btn-auth bg-green mr-1 sm:mr-4 animate"
              onClick={() => setOpenModal("register")}
            >
              <UserRoundPlus size={16} strokeWidth={2} />
              Register
            </button>
          </div>
        </div>
      )}

      {openModal === "login" && (
        <Suspense fallback={<LoadingSpinner />}>
          <LoginModal
            onClose={() => setOpenModal(null)}
            switchModal={switchModal}
          />
        </Suspense>
      )}

      {openModal === "register" && (
        <Suspense fallback={<LoadingSpinner />}>
          <RegisterModal
            onClose={() => setOpenModal(null)}
            switchModal={switchModal}
          />
        </Suspense>
      )}
      <Navbar
        activeUser={activeUser}
        onMobileLogout={() => setShowConfirmation(true)}
      />
    </header>
  );
}
