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
      <main className="max-w-[1016px] md:mx-auto">
        <div className="bg-[url('/images/pastel-house-compressed.jpg')] bg-cover h-[200px] sm:h-[350px] md:h-[495px] flex flex-col justify-center items-center">
          <h1 className="font-poppins text-m drop-shadow-s text-green sm:text-l md:text-xl">
            Find your place in the world
          </h1>
          <SearchBar onSearch={onSearch} query={searchQuery} />
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-28 px-4 gap-2 text-green font-medium text-center">
            <CircleAlert size={32} color="#f28f6b" />
            <p>Oops, something went wrong. Could not load data.</p>
          </div>
        ) : (
          <div className="py-8 px-2">
            <div>
              {venues.length > 0 ? (
                <ul className="flex flex-wrap justify-center gap-8 mb-10 sm:gap-12">
                  {venues.map((venue) => (
                    <li
                      key={venue.id}
                      className="w-[260px] h-[290px] sm:w-[300px] sm:h-[310px] font-inter relative hover animate"
                    >
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
                <p className="text-green font-medium text-center py-28">
                  No venues found.
                </p>
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
