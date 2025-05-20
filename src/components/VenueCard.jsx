import { MapPin, Star, Users } from "lucide-react";
import { Link } from "react-router";

/**
 * Venue card component that displays venue information.
 * A user can click on the card to view more details about the venue.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} id - The ID of the venue.
 * @param {Object} img - The image object containing URL and alt text.
 * @param {string} name - The name of the venue.
 * @param {Object} location - The location object containing city and country.
 * @param {number} price - The price of the venue.
 * @param {number} maxGuests - The maximum number of guests allowed.
 * @param {number} rating - The rating of the venue.
 * @returns {JSX.Element} The rendered component.
 */
export default function VenueCard({
  id,
  img,
  name,
  location,
  price,
  maxGuests,
  rating,
}) {
  return (
    <Link
      to={`/venue/${id}`}
      title="View venue details"
      className="flex flex-col gap-2"
    >
      <img
        className="w-full h-[180px] object-cover sm:h-[220px] rounded-xl"
        src={img?.url || "/images/default-img.png"}
        alt={img?.alt || "Venue image"}
      />
      {rating > 0 && (
        <div className="card-icon bg-orange left-1">
          <Star size={19} strokeWidth={2} />
          <p>{rating}</p>
        </div>
      )}
      <div className="card-icon bg-green right-1">
        <Users size={19} strokeWidth={2} />
        <p>{maxGuests}</p>
      </div>
      <div className="px-2">
        <div className="flex items-center gap-1">
          <MapPin size={19} strokeWidth={1.5} className="text-orange" />
          <p className="text-sm opacity-60 max-w-[200px] truncate">
            {location.city && location.country
              ? `${location.city}, ${location.country}`
              : "undefined"}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <h2 className="max-w-[150px] text-green font-semibold truncate">
            {!name ? "Undefined" : name}
          </h2>
          <div>
            <p className="font-semibold">{price} kr</p>
            <p className="text-xs opacity-60">per night</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
