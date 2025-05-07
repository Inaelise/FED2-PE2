import { X } from "lucide-react";
import { save } from "../storage/save";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";
import { loginUser } from "../api/auth/login";

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
    <div>
      <button onClick={onClose}>
        <X />
      </button>
      <h1>Login</h1>
      <div>
        <p>Don't have an account?</p>
        <p onClick={() => switchModal("register")}>Register here</p>
      </div>
      <form onSubmit={handleSubmit(onLogin)}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" {...register("email")} />
        <p>{errors.email?.message}</p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <div>
          <div>
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a href="#">Forgot your password?</a>
        </div>
        <button type="submit" title="Login">
          Login
        </button>
      </form>
    </div>
  );
}
