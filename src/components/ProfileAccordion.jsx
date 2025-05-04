import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router";

export default function ProfileAccordion({ user }) {
  const [open, setOpen] = useState(null);

  const toggleSection = (section) => {
    setOpen((prev) => (prev === section ? null : section));
  };

  return (
    <div>
      <div onClick={() => toggleSection("bookings")}>
        <h2>Your bookings ({user.bookings?.length})</h2>
        {open === "bookings" ? <ChevronUp /> : <ChevronDown />}
      </div>
      {open === "bookings" && (
        <div>
          {user.bookings?.length > 0 ? (
            <ul>
              {user.bookings.map((booking) => (
                <li key={booking.id}>
                  <div>
                    <p>Venue name:</p>
                    <Link to={`/venue/${booking.venue.id}`} title="View venue">
                      <p>{booking.venue.name}</p>
                    </Link>
                  </div>
                  <div>
                    <p>Dates:</p>
                    <p>
                      {new Date(booking.dateFrom).toLocaleDateString("no-NO")} -{" "}
                      {new Date(booking.dateTo).toLocaleDateString("no-NO")}
                    </p>
                  </div>
                  <div>
                    <p>Guests:</p>
                    <p>{booking.guests}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p>No bookings found.</p>
              <Link to={"/"} title="Go to home page">
                Book a stay here
              </Link>
            </div>
          )}
        </div>
      )}
      <div onClick={() => toggleSection("venues")}>
        <h2>Your venues ({user.venues?.length})</h2>
        {open === "venues" ? <ChevronUp /> : <ChevronDown />}
      </div>
      {open === "venues" && (
        <div>
          {user.venues?.length > 0 ? (
            <ul>
              {user.venues?.map((venue) => (
                <li key={venue.id}>
                  <Link to={`/venue/${venue.id}`} title="View venue">
                    <img
                      src={venue.media[0]?.url}
                      alt={venue.media[0]?.alt || "Venue thumbnail"}
                    />
                    <p>{venue.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p>No venues found.</p>
              <Link to={"/create-venue"} title="Go to create venue page">
                Create venue here
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
