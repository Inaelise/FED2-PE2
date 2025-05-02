import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
      {/* {open === "bookings" && (
        <ul>
          {user.bookings.map((booking) => (
            <li key={booking.id}>
              <div>
              <p>Venue name:</p>
              <p></p>
              </div>
            </li>
          ))}
        </ul>
      ) } */}
      <div onClick={() => toggleSection("venues")}>
        <h2>Your venues({user.venues?.length})</h2>
        {open === "venues" ? <ChevronUp /> : <ChevronDown />}
      </div>
      {open === "venues" && (
        <ul>
          {user.venues?.map((venue) => (
            <li key={venue.id}>
              <img
                src={venue.media[0]?.url}
                alt={venue.media[0]?.alt || "Venue thumbnail"}
              />
              <p>{venue.name}</p>
            </li>
          ))}
        </ul>
      )}
      <div>
        <h2>Your venue bookings ({/* Add customer bookings */})</h2>
      </div>
    </div>
  );
}
