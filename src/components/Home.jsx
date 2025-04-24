import SearchBar from "./SearchBar";
import VenueCard from "./VenueCard";
import Pagination from "./Pagination";

export default function Home({
  venues,
  onSearch,
  currentPage,
  setCurrentPage,
  meta,
}) {
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
          <SearchBar onSearch={onSearch} query={""} />
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
        <Pagination
          meta={meta}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </>
  );
}
