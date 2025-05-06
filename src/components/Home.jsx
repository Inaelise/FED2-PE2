import SearchBar from "./SearchBar";
import VenueCard from "./VenueCard";
import Pagination from "./Pagination";
import { CircleAlert } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

/**
 * Home component that displays a list of venues with search and pagination.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} venues - Array of venue objects to display.
 * @param {Function} onSearch - Function to handle search input changes.
 * @param {number} currentPage - Current page number for pagination.
 * @param {Function} setCurrentPage - Function to update the current page number.
 * @param {Object} meta - Metadata for pagination (e.g., total pages).
 * @param {string} searchQuery - Current search query string.
 * @param {boolean} isLoading - Whether the venues are currently being loaded.
 * @param {boolean} isError - Whether there was an error fetching data.
 * @returns {JSX.Element} The rendered Home component.
 */
export default function Home({
  venues,
  onSearch,
  currentPage,
  setCurrentPage,
  meta,
  searchQuery,
  isLoading,
  isError,
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
          <SearchBar onSearch={onSearch} query={searchQuery} />
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <div>
            <CircleAlert />
            <p>Oops, something went wrong. Could not load data.</p>
          </div>
        ) : (
          <div>
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
          </div>
        )}
      </main>
    </>
  );
}
