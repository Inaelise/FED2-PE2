import {
  MapPin,
  SquarePen,
  MoveRight,
  Check,
  X,
  Star,
  CircleAlert,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import EditVenueModal from "./EditVenueModal";
import BookingForm from "./BookingForm";
import { load } from "../storage/load";
import LoadingSpinner from "./LoadingSpinner";
import { getSpecificVenue } from "../api/venue/read";

/**
 * Displays a specific venue's details, including images, amenities, bookings, and allows booking or editing (if the user is the owner).
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} removeVenue - Callback to remove the venue after deletion.
 * @returns {JSX.Element} The rendered component.
 */
export default function SpecificVenue({ removeVenue }) {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const activeUser = load("user");

  useEffect(() => {
    async function fetchVenue() {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await getSpecificVenue(id);
        setVenue(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenue();
  }, [id]);

  const handleUpdate = (updatedVenue) => {
    setVenue(updatedVenue);
    setOpenModal(false);
  };

  return (
    <>
      {venue && (
        <>
          <meta
            name="description"
            content={
              venue.description ||
              "This is the specific venue page where you can find venue info."
            }
          />
          <title>{venue.name || "Venue page"}</title>
        </>
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <div>
          <CircleAlert />
          <p>Oops, something went wrong. Couldn't find venue.</p>
        </div>
      ) : venue ? (
        <main>
          <h1>{venue.name}</h1>
          <div>
            <MapPin />
            <p>
              {venue.location.city}, {venue.location.country}
            </p>
          </div>
          <div>
            <div>
              <Star /> <p>{venue.rating}</p>
            </div>
            <ImageGallery media={venue.media} />
          </div>
          <section>
            <h2>Description</h2>
            {activeUser === venue.owner.name && (
              <button onClick={() => setOpenModal(true)}>
                <SquarePen />
              </button>
            )}
            {openModal && (
              <EditVenueModal
                venue={venue}
                onClose={() => setOpenModal(false)}
                onUpdate={handleUpdate}
                removeVenue={removeVenue}
              />
            )}
            <p>{venue.description}</p>
          </section>
          <section>
            <h2>Amenities</h2>
            <ul>
              {venue.meta &&
                Object.entries(venue.meta).map(([key, value]) => (
                  <li key={key}>
                    {value ? <Check strokeWidth={1} /> : <X strokeWidth={1} />}
                    <p>{key}</p>
                  </li>
                ))}
            </ul>
          </section>
          <section>
            <h2>Bookings</h2>
            <ul>
              {venue.bookings?.map((booking) => (
                <li key={booking.id}>
                  <img
                    src={booking.customer?.avatar?.url}
                    alt={booking.customer?.avatar?.alt}
                  />
                  <div>
                    <p>{booking.customer?.name}</p>
                    <p>{booking.guests} guests</p>
                  </div>
                  <p>
                    {new Date(booking.dateFrom).toLocaleDateString("no-NO")}
                    <MoveRight />
                    {new Date(booking.dateTo).toLocaleDateString("no-NO")}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Book your stay</h2>
            <p>Max {venue.maxGuests} guests</p>
            <div>
              <p>{venue.price} kr</p>
              <p>per night</p>
            </div>
            {activeUser ? (
              <BookingForm
                venueId={venue.id}
                maxGuests={venue.maxGuests}
                price={venue.price}
              />
            ) : (
              <p>Login to make a booking.</p>
            )}
          </section>
          <section>
            <h2>Location & owner</h2>
            <div>
              <p>{venue.location?.address}</p>
              <p>
                {venue.location?.zip} {venue.location?.city}
              </p>
              <p>{venue.location?.country}</p>
            </div>
            {venue.owner && (
              <div>
                <img
                  src={venue.owner.avatar?.url}
                  alt={venue.owner.avatar?.alt || "Owner avatar"}
                />
                <div>
                  <p>{venue.owner.name}</p>
                  <p>{venue.owner.email}</p>
                </div>
              </div>
            )}
          </section>
        </main>
      ) : null}
    </>
  );
}
