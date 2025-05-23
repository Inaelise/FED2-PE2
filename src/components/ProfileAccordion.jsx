import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Link } from "react-router";
import { deleteBooking } from "../api/profile/deleteBooking";
import { useToast } from "../context/ToastContext";
import ConfirmationModal from "./ConfirmationModal";

/**
 * Profile accordion component that displays user bookings and venues in an accordion format.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} user - The user object containing bookings and venues.
 * @param {Array} user.bookings - List of bookings made by the user.
 * @param {Array} user.venues - List of venues owned by the user.
 * @returns {JSX.Element} - The rendered component.
 */
export default function ProfileAccordion({ user }) {
  const [open, setOpen] = useState(null);
  const [bookings, setBookings] = useState(user.bookings || []);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { showToast } = useToast();

  const toggleSection = (section) => {
    setOpen((prev) => (prev === section ? null : section));
  };

  function handleCancel() {
    setShowConfirmation(false);
    setSelectedBookingId(null);
  }

  /**
   * Handles the confirmation of cancelling a booking.
   * Calls the API to delete the booking and updates the local state.
   *
   * @returns {Promise<void>} A promise that resolves when the booking is deleted successfully.
   */
  async function handleConfirm() {
    setShowConfirmation(false);
    setSelectedBookingId(null);

    try {
      await deleteBooking(selectedBookingId);
      setBookings((prev) =>
        prev.filter((booking) => booking.id !== selectedBookingId)
      );
      showToast({ message: "Booking cancelled!", type: "success" });
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
  }

  return (
    <div className="mx-2">
      <div className="border-1 border-[#00000020] my-6 mx-auto max-w-[675px]">
        <div
          onClick={() => toggleSection("bookings")}
          className="accordionDiv animate"
        >
          <h2>Your bookings ({bookings?.length})</h2>
          {open === "bookings" ? (
            <ChevronUp className="text-orange" />
          ) : (
            <ChevronDown className="text-orange" />
          )}
        </div>
        {open !== "bookings" && <hr className="opacity-20" />}

        {open === "bookings" && (
          <div>
            {bookings?.length > 0 ? (
              <div>
                <ul className="py-4 px-2 text-xs flex flex-col gap-6 sm:gap-8 sm:px-6 sm:py-6">
                  {bookings.map((booking) => (
                    <li
                      key={booking.id}
                      className="flex flex-row justify-between"
                    >
                      <div className="max-w-20 flex flex-col gap-2">
                        <p className="font-semibold opacity-40">Venue name:</p>
                        <Link
                          to={`/venue/${booking.venue.id}`}
                          title="View venue"
                        >
                          <p>{booking.venue.name}</p>
                        </Link>
                      </div>
                      <div className="max-w-20 flex flex-col gap-2">
                        <p className="font-semibold opacity-40">Dates:</p>
                        <p>
                          {new Date(booking.dateFrom).toLocaleDateString(
                            "no-NO"
                          )}
                          {new Date(booking.dateTo).toLocaleDateString("no-NO")}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold opacity-40">Guests:</p>
                        <p>{booking.guests}</p>
                      </div>
                      <button
                        type="button"
                        title="Cancel booking"
                        className="cursor-pointer mr-0.5"
                        onClick={() => {
                          setSelectedBookingId(booking.id);
                          setShowConfirmation(true);
                        }}
                      >
                        <X size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
                <hr className="opacity-20" />
              </div>
            ) : (
              <div>
                <div className="text-center pt-4 pb-8 text-sm">
                  <p>No bookings found.</p>
                  <Link
                    to={"/"}
                    title="Go to home page"
                    className="text-orange font-semibold underline underline-offset-2"
                  >
                    Book a stay here
                  </Link>
                </div>
                <hr className="opacity-20" />
              </div>
            )}
          </div>
        )}
        <div
          onClick={() => toggleSection("venues")}
          className="accordionDiv animate"
        >
          <h2>Your venues ({user.venues?.length})</h2>
          {open === "venues" ? (
            <ChevronUp className="text-orange" />
          ) : (
            <ChevronDown className="text-orange" />
          )}
        </div>
        {open === "venues" && (
          <div>
            {user.venues?.length > 0 ? (
              <ul className="py-4 px-2 text-xs flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-10 sm:px-6 sm:py-6">
                {user.venues?.map((venue) => (
                  <li key={venue.id} className="hover animate">
                    <Link
                      to={`/venue/${venue.id}`}
                      title="View venue"
                      className="flex flex-col items-center gap-2"
                    >
                      <img
                        className="w-50 h-32 object-cover rounded-2xl drop-shadow-base"
                        src={venue.media[0]?.url}
                        alt={venue.media[0]?.alt || "Venue thumbnail"}
                      />
                      <p className="font-poppins text-sm text-orange font-semibold">
                        {venue.name}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center pt-4 pb-8 text-sm">
                {user.venueManager ? (
                  <>
                    <p>No venues found.</p>
                    <Link
                      to={"/create-venue"}
                      title="Go to create venue page"
                      className="text-orange font-semibold underline underline-offset-2"
                    >
                      Create venue here
                    </Link>
                  </>
                ) : (
                  <div className="flex flex-col gap-1">
                    <p> Only for venue managers.</p>
                    <p>You can change your status by editing your profile.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {showConfirmation && (
        <ConfirmationModal
          title="Cancel booking?"
          message={`Are you sure you want to cancel this booking?`}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
