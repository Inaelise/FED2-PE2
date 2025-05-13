import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router";

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

  const toggleSection = (section) => {
    setOpen((prev) => (prev === section ? null : section));
  };

  return (
    <div className="mx-2">
      <div className="border-1 border-[#00000020] my-6 mx-auto max-w-[675px]">
        <div
          onClick={() => toggleSection("bookings")}
          className="accordionDiv animate"
        >
          <h2>Your bookings ({user.bookings?.length})</h2>
          {open === "bookings" ? (
            <ChevronUp className="text-orange" />
          ) : (
            <ChevronDown className="text-orange" />
          )}
        </div>
        {open !== "bookings" && <hr className="opacity-20" />}

        {open === "bookings" && (
          <div>
            {user.bookings?.length > 0 ? (
              <div>
                <ul className="py-4 px-2 text-xs flex flex-col gap-6 sm:gap-8 sm:px-6 sm:py-6">
                  {user.bookings.map((booking) => (
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
                          )}{" "}
                          -{" "}
                          {new Date(booking.dateTo).toLocaleDateString("no-NO")}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold opacity-40">Guests:</p>
                        <p>{booking.guests}</p>
                      </div>
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
                <p>No venues found.</p>
                <Link
                  to={"/create-venue"}
                  title="Go to create venue page"
                  className="text-orange font-semibold underline underline-offset-2"
                >
                  Create venue here
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
