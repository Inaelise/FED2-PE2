import { NavLink } from "react-router-dom";

/**
 * Page not found component that is displayed when the user tries to access a page that does not exist.
 *
 * @returns {JSX.Element} - The rendered component.
 */
export default function PageNotFound() {
  return (
    <>
      <meta
        name="description"
        content="The page you're looking for does not exist."
      />
      <title>Page Not Found</title>
      <main>
        <div>
          <h1>Page not found</h1>
          <p>Oops, the page you are looking for does not exist.</p>
          <NavLink to="/">
            <button>Go to home</button>
          </NavLink>
        </div>
      </main>
    </>
  );
}
