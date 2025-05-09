/**
 * Loading spinner component that displays a loading spinner while data is being fetched.
 *
 * @returns {JSX.Element} - The rendered component.
 */
export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-[250px] md:h-screen">
      <div className="size-6 border-6 border-solid border-gray-300 border-t-orange rounded-full animate-spin" />
    </div>
  );
}
