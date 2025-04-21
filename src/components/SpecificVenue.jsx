import { MapPin, Plus, Minus, SquarePen } from "lucide-react";

export default function SpecificVenue() {
  return (
    <>
      <meta name="description" content="" />
      <title></title>
      <main>
        <h1>Venue name</h1>
        <p>
          <MapPin />
          Location
        </p>
        <div>{/* Add image gallery here */}</div>
        <section>
          <h2>Description</h2>
          <SquarePen />
          <p>Description text goes here</p>
        </section>
        <section>
          <h2>Amenities</h2>
          <ul>{/* Add list of amenities here */}</ul>
        </section>
        <section>
          <h2>Bookings</h2>
          <div>
            <img src="#" alt="User avatar" title="User name" />
            <div>
              <p>{/* Username goes here */}</p>
              <p>{/* Guest amount goes here */}</p>
            </div>
          </div>
          <p>{/* Booking date goes here */}</p>
        </section>
        <section>
          <button></button>
          <h2>Book your stay</h2>
          <p>{/* Max guests here */}</p>
          <p>{/* Price here */}</p>
          <div>
            <p>Select guests</p>
            <div>
              <button>
                <Minus />
              </button>
              <p>{/* Guest amount here */}</p>
              <button>
                <Plus />
              </button>
            </div>
            <div>{/* Calendar goes here */}</div>
          </div>
        </section>
        <section>
          <h2>Location & owner</h2>
          <p>{/* Address goes here */}</p>
          <div>
            <img src="#" alt="User avatar" />
            <div>
              <p>{/* owners name goes here */}</p>
              <p>{/* owners email goes here */}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
