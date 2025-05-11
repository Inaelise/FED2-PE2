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
        <main className="font-inter">
          <div className="px-4 py-6">
            <h1 className="font-poppins text-orange font-semibold text-l">
              {venue.name}
            </h1>
            <div className="flex items-center gap-1">
              <MapPin size={18} className="text-orange" />
              <p className="text-xs opacity-60">
                {venue.location.city}, {venue.location.country}
              </p>
            </div>
          </div>
          <div className="relative">
            <ImageGallery media={venue.media} />
            <div className="absolute top-2 left-1 z-5 card-icon bg-orange">
              <Star size={19} strokeWidth={2} />
              <p>{venue.rating}</p>
            </div>
          </div>
          <section className="venue-sections">
            <div className="flex justify-between">
              <h2 className="venue-h2">Description</h2>
              {activeUser === venue.owner.name && (
                <button onClick={() => setOpenModal(true)}>
                  <SquarePen className="text-green" />
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
            </div>
            <hr className="hr" />
            <p>{venue.description}</p>
          </section>
          <section className="venue-sections">
            <h2 className="venue-h2">Amenities</h2>
            <hr className="hr" />
            <ul className="grid grid-cols-2 grid-rows-2 gap-4">
              {venue.meta &&
                Object.entries(venue.meta).map(([key, value]) => (
                  <li key={key} className="flex gap-2">
                    {value ? (
                      <Check strokeWidth={1.5} className="text-orange" />
                    ) : (
                      <X strokeWidth={1.5} className="text-green" />
                    )}
                    <p>{key}</p>
                  </li>
                ))}
            </ul>
          </section>
          <section className="venue-sections">
            <h2 className="venue-h2">Book your stay</h2>
            <div className="flex justify-between">
              <div className="bg-[#42584430] inline-block py-1.5 px-3 text-green font-semibold rounded-full my-2">
                <p>Max {venue.maxGuests} guests</p>
              </div>
              <div>
                <p className="text-orange font-semibold text-2xl">
                  {venue.price} kr
                </p>
                <p className="text-xs opacity-60">per night</p>
              </div>
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
          <section className="venue-sections">
            <h2 className="venue-h2">Location & owner</h2>
            <hr className="hr" />
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
          <section className="venue-sections">
            <h2 className="venue-h2">Bookings</h2>
            <hr className="hr" />
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
        </main>
      ) : null}
    </>
  );
}
