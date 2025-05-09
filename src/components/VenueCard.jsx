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
    <Link to={`/venue/${id}`} title="View venue details">
      <img
        className="w-[200px]"
        src={img?.url || "/images/default-img.png"}
        alt={img?.alt || "Venue image"}
      />
      <div>
        <Star strokeWidth={1} />
        <p>{rating}</p>
      </div>
      <div>
        <Users strokeWidth={1} />
        <p>{maxGuests}</p>
      </div>
      <div>
        <MapPin strokeWidth={1} />
        <p>
          {location.city}, {location.country}
        </p>
      </div>
      <div>
        <h2>{name}</h2>
        <div>
          <p>{price} kr</p>
          <p>per night</p>
        </div>
      </div>
    </Link>
  );
}
