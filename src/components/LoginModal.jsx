import { X } from "lucide-react";
import { save } from "../storage/save";
import { headers } from "../api/headers";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { API_AUTH_LOGIN } from "../api/constants";

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

export default function LoginModal({ onClose, switchModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  async function loginUser({ email, password }) {
    const options = {
      method: "POST",
      headers: headers("application/json"),
      body: JSON.stringify({ email, password }),
    };

    try {
      const response = await fetch(API_AUTH_LOGIN, options);
      if (!response.ok) {
        throw new Error("Failed to login user.");
      }
      const json = await response.json();
      save("token", json.data.accessToken);
      save("user", json.data.name);
      console.log("Login successful:", json);
      reset();
      onClose();
    } catch (error) {
      console.error("Error:", error);
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
      <form onSubmit={handleSubmit(loginUser)}>
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
