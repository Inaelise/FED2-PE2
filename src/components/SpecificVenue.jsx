import {
  MapPin,
  Plus,
  Minus,
  SquarePen,
  MoveRight,
  Check,
  X,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import ImageGallery from "./ImageGallery";
import EditVenueModal from "./EditVenueModal";

export default function SpecificVenue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [guests, setGuests] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const apiUrl = `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true&_customer=true`;
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
          <button onClick={() => setOpenModal(true)}>
            <SquarePen />
          </button>
          {openModal && <EditVenueModal onClose={() => setOpenModal(false)} />}
          <p>{venue.description}</p>
        </section>
        <section>
          <h2>Amenities</h2>
          <ul>
            {Object.entries(venue.meta).map(([key, value]) => (
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
            {venue.bookings.map((booking) => (
              <li key={booking.id}>
                <img
                  src={booking.customer.avatar.url}
                  alt={booking.customer.avatar.alt}
                />
                <div>
                  <p>{booking.customer.name}</p>
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
          <form>
            <p>Select guests</p>
            <div>
              <button
                type="button"
                onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                disabled={guests === 1}
              >
                <Minus />
              </button>
              <p>{guests}</p>
              <button
                type="button"
                onClick={() =>
                  setGuests((prev) => Math.min(venue.maxGuests, prev + 1))
                }
                disabled={guests === venue.maxGuests}
              >
                <Plus />
              </button>
            </div>
            <div>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                minDate={new Date()}
              />
            </div>
            <button>Book now</button>
          </form>
        </section>
        <section>
          <h2>Location & owner</h2>
          <div>
            <p>{venue.location.address}</p>
            <p>
              {venue.location.zip} {venue.location.city}
            </p>
            <p>{venue.location.country}</p>
          </div>
          <div>
            <img src={venue.owner.avatar.url} alt={venue.owner.avatar.alt} />
            <div>
              <p>{venue.owner.name}</p>
              <p>{venue.owner.email}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
