import { MapPin, Star, Users } from "lucide-react";
import { Link } from "react-router";

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
