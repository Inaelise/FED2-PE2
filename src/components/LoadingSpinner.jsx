export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="size-6 border-6 border-solid border-gray-300 border-t-black rounded-full animate-spin" />
    </div>
  );
}
