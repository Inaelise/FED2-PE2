import { X } from "lucide-react";
import { save } from "../storage/save";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";
import { loginUser } from "../api/auth/login";
import { useEffect, useRef } from "react";

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email.")
    .required("Please enter your email."),
  password: yup
    .string()
    .min(8, "Your password should be at least 8 characters.")
    .required("Please enter your password."),
});

/**
 * Modal component for user login.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} onClose - Function to close the modal.
 * @param {Function} switchModal - Function to switch to another modal (e.g., registration).
 * @returns {JSX.Element} The rendered login modal.
 */
export default function LoginModal({ onClose, switchModal }) {
  const { showToast } = useToast();
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  async function onLogin({ email, password }) {
    try {
      const data = await loginUser({ email, password });

      save("token", data.accessToken);
      save("user", data.name);
      save("status", data.venueManager);

      showToast({ message: "Login successful!", type: "success" });
      reset();
      onClose();
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
  }

  return (
    <div className="overlay">
      <div ref={modalRef} className="header-modal-div">
        <button onClick={onClose} className="btn-close">
          <X strokeWidth={2.5} />
        </button>
        <h1 className="header-modal-h1 text-green">Login</h1>
        <div className="flex flex-col gap-1 items-center text-sm">
          <p>Don't have an account?</p>
          <p
            onClick={() => switchModal("register")}
            className="header-modal-link text-orange"
          >
            Register here
          </p>
        </div>
        <form onSubmit={handleSubmit(onLogin)} className="header-modal-form">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="label-primary">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email")}
              className="input-primary"
            />
            <p className="errorMsgForm">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="label-primary">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password")}
              className="input-primary"
            />
            <p className="errorMsgForm">{errors.password?.message}</p>
          </div>
          <div className="flex justify-between text-xs">
            <div className="flex gap-1">
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember" className="font-semibold">
                Remember me
              </label>
            </div>
            <a href="#" className="text-orange underline underline-offset-2">
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            title="Login"
            className="btn-form bg-orange hover animate"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
