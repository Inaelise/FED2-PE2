import { MapPin, SquarePen, MoveRight, Check, X, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import EditVenueModal from "./EditVenueModal";
import { API_HOLIDAZE_VENUES } from "../api/constants";
import BookingForm from "./BookingForm";
import { load } from "../storage/load";

export default function SpecificVenue({ removeVenue }) {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const activeUser = load("user");

  useEffect(() => {
    const apiUrl = `${API_HOLIDAZE_VENUES}/${id}?_owner=true&_bookings=true&_customer=true`;
    async function fetchVenue() {
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        setVenue(json.data);
        console.log(json);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    }

    fetchVenue();
  }, [id]);

  const handleUpdate = (updatedVenue) => {
    setVenue(updatedVenue);
    setOpenModal(false);
  };

  if (!venue) {
    return <h2>Venue not found</h2>;
  }

  return (
    <>
      <meta name="description" content={venue.description} />
      <title>{venue.name}</title>
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
    </>
  );
}
