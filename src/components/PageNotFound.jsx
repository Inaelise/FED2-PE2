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
      <main className="font-inter">
        <div className="relative bg-[url('/images/pastel-street-compressed.jpg')] bg-cover bg-right h-[400px] mt-30 mx-auto max-w-[700px]">
          <div className="absolute inset-0 bg-white opacity-50" />
          <div className="absolute inset-0 z-5 flex flex-col items-center justify-center text-center text-green gap-6">
            <h1 className="font-bold text-l">Page not found</h1>
            <p>Oops, the page you are looking for does not exist.</p>
            <NavLink to="/">
              <button className="bg-orange font-semibold text-white drop-shadow-base py-1.5 px-18 rounded-full cursor-pointer mt-6 hover animate">
                Go to home
              </button>
            </NavLink>
          </div>
        </div>
      </main>
    </>
  );
}
