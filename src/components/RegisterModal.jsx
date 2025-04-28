import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { headers } from "../api/headers";

const schema = yup.object({
  venueManager: yup.boolean().optional(),
  name: yup
    .string()
    .min(3, "Your name should be at least 3 characters.")
    .max(20, "Your name can't be longer than 20 characters")
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

export default function RegisterModal({ onClose, switchModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  async function registerUser({ venueManager, name, email, password }) {
    const url = "https://v2.api.noroff.dev/auth/register";
    const options = {
      method: "POST",
      headers: headers("application/json"),
      body: JSON.stringify({ venueManager, name, email, password }),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to register user.");
      }
      const json = await response.json();
      console.log("Registration successful:", json);
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
      <h1>Register</h1>
      <div>
        <p>Already have an account?</p>
        <p onClick={() => switchModal("login")}>Login here</p>
      </div>
      <form onSubmit={handleSubmit(registerUser)}>
        <div>
          <input
            type="checkbox"
            id="manager"
            name="manager"
            {...register("venueManager")}
          />
          <label htmlFor="manager">Venue manager</label>
        </div>
        <label htmlFor="name">name</label>
        <input type="name" id="name" name="name" {...register("name")} />
        <p>{errors.name?.message}</p>
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
        <button type="submit" title="Register account">
          Register
        </button>
      </form>
    </div>
  );
}
