import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginModal({ onClose, switchModal }) {
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
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <div>
          <div>
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a href="#">Forgot your password?</a>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
