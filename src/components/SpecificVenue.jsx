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
        <div className="oopsMsg">
          <CircleAlert size={32} color="#f28f6b" />
          <p>Oops, something went wrong. Couldn't find venue.</p>
        </div>
      ) : venue ? (
        <main className="font-inter md:pt-10">
          <div className="max-w-[754px] mx-auto">
            <div className="py-6 px-2 md:px-0">
              <h1 className="font-poppins text-orange font-semibold text-l">
                {venue.name}
              </h1>
              <div className="flex items-center gap-1">
                <MapPin size={18} className="text-orange" />
                <p className="text-xs opacity-60">
                  {venue.location.city && venue.location.country
                    ? `${venue.location.city}, ${venue.location.country}`
                    : "undefined"}
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
          </div>
          <div className="py-4 sm:py-12 sm:px-6 md:grid md:grid-cols-2 md:gap-20 max-w-[1000px] mx-auto">
            <div className="md:space-y-8">
              <section className="venue-sections">
                <div className="flex justify-between">
                  <h2 className="venue-h2">Description</h2>
                  {activeUser === venue.owner.name && (
                    <button
                      onClick={() => setOpenModal(true)}
                      className="cursor-pointer"
                    >
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
                <h2 className="venue-h2">Location & owner</h2>
                <hr className="hr" />
                <div className="flex flex-col gap-2">
                  <p>{venue.location?.address}</p>
                  <p>
                    {venue.location?.zip} {venue.location?.city}
                  </p>
                  <p className="font-bold text-green">
                    {venue.location?.country}
                  </p>
                </div>
                {venue.owner && (
                  <div className="flex items-center gap-3 text-sm mt-10">
                    <img
                      className="w-10 h-10 object-cover rounded-full"
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
            </div>
            <div className="md:space-y-8">
              <section className="venue-sections mb-0">
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
                  <p className="mt-8 border-1 border-red py-1.5 bg-[#f28f6b48] text-red font-semibold text-sm flex items-center justify-center gap-2">
                    <CircleAlert size={18} />
                    Login to make a booking.
                  </p>
                )}
              </section>
              {activeUser === venue.owner.name && (
                <section className="venue-sections">
                  <h2 className="venue-h2">Bookings</h2>
                  <hr className="hr" />
                  {venue.bookings.length > 0 ? (
                    <ul className="flex flex-col gap-10">
                      {venue.bookings?.map((booking) => (
                        <li key={booking.id} className="flex justify-between">
                          <div className="flex gap-1.5">
                            <img
                              className="w-8 h-8 object-cover rounded-full"
                              src={booking.customer?.avatar?.url}
                              alt={booking.customer?.avatar?.alt}
                            />
                            <div className="text-xs sm:text-sm">
                              <p>{booking.customer?.name}</p>
                              <p className="opacity-60">
                                {booking.guests} guests
                              </p>
                            </div>
                          </div>
                          <div className="flex text-xs gap-1 sm:text-[13px]">
                            <p>
                              {new Date(booking.dateFrom).toLocaleDateString(
                                "no-NO"
                              )}
                            </p>
                            <p>-</p>
                            <p>
                              {new Date(booking.dateTo).toLocaleDateString(
                                "no-NO"
                              )}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No bookings made yet.</p>
                  )}
                </section>
              )}
            </div>
          </div>
        </main>
      ) : null}
    </>
  );
}
