import VenueCard from "./VenueCard";

export default function Home({ venues }) {
  console.log(venues);
  return (
    <>
      <meta
        name="description"
        content="Holidaze - find your place in the world. Book your stay now!"
      />
      <title>Holidaze</title>
      <main>
        <div>
          <h1>Find your place in the world</h1>
          {/* Add searchbar here */}
        </div>
        <div>
          {venues.length > 0 ? (
            <ul>
              {venues.map((venue) => (
                <li key={venue.id}>
                  <VenueCard
                    id={venue.id}
                    img={venue.media?.[0]}
                    name={venue.name}
                    location={venue.location}
                    price={venue.price}
                    maxGuests={venue.maxGuests}
                    rating={venue.rating}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No venues found.</p>
          )}
        </div>
      </main>
    </>
  );
}
