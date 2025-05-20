import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../context/ToastContext";
import { registerUser } from "../api/auth/register";
import { useEffect, useRef } from "react";

const schema = yup.object({
  venueManager: yup.boolean().optional(),
  name: yup
    .string()
    .min(3, "Your name should be at least 3 characters.")
    .max(20, "Your name can't be longer than 20 characters.")
    .required("Please enter a username."),
  email: yup
    .string()
    .email("Invalid email.")
    .required("Please enter an email."),
  password: yup
    .string()
    .min(8, "Your password should be at least 8 characters.")
    .required("Please enter a password."),
});

/**
 * Modal component for user registration.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} onClose - Function to close the modal.
 * @param {Function} switchModal - Function to switch to another modal (e.g., login).
 * @returns {JSX.Element} The rendered registration modal.
 */
export default function RegisterModal({ onClose, switchModal }) {
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

  async function onRegister({ venueManager, name, email, password }) {
    try {
      await registerUser({
        venueManager,
        name,
        email,
        password,
      });

      showToast({ message: "Registration successful!", type: "success" });
      reset();
      onClose();
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
  }

  return (
    <div className="overlay z-60">
      <div ref={modalRef} className="modal-div top-20 max-w-[400px]">
        <button onClick={onClose} className="btn-close">
          <X />
        </button>
        <h1 className="modal-h1 text-orange">Register</h1>
        <div className="flex flex-col gap-1 items-center text-sm">
          <p>Already have an account?</p>
          <p
            onClick={() => switchModal("login")}
            className="header-modal-link text-green"
          >
            Login here
          </p>
        </div>
        <form onSubmit={handleSubmit(onRegister)} className="header-modal-form">
          <div className="flex gap-1 text-xs">
            <input
              type="checkbox"
              id="manager"
              name="manager"
              {...register("venueManager")}
            />
            <label htmlFor="manager" className="font-semibold">
              Venue manager
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="label-primary">
              name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              autoComplete="on"
              {...register("name")}
              className="input-primary"
            />
            <p className="errorMsgForm">{errors.name?.message}</p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="label-primary">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="on"
              placeholder="example@stud.noroff.no"
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
              placeholder="********"
              {...register("password")}
              className="input-primary"
            />
            <p className="errorMsgForm">{errors.password?.message}</p>
          </div>
          <button
            type="submit"
            title="Register account"
            className="btn-form bg-green hover animate"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
