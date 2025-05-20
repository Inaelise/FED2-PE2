import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import SpecificVenue from "./components/SpecificVenue";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import CreateVenueForm from "./components/CreateVenueForm";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getVenues } from "./api/venue/read";

function App() {
  const [venues, setVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function fetchVenues() {
      setIsLoading(true);
      setIsError(false);
      try {
        const json = await getVenues({
          page: currentPage,
          query: searchQuery,
        });

        setVenues(json.data);
        setMeta(json.meta);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVenues();
  }, [searchQuery, currentPage, location.state]);

  const removeVenue = (venueId) => {
    setVenues((prevVenues) =>
      prevVenues.filter((venue) => venue.id !== venueId)
    );
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  {
    /* Scrolls to top on pagination or venue list change */
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, venues]);

  {
    /* Scrolls to top on route change */
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Home
              venues={venues}
              onSearch={handleSearch}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              meta={meta}
              searchQuery={searchQuery}
              isLoading={isLoading}
              isError={isError}
            />
          }
        />
        <Route
          path="venue/:id"
          element={<SpecificVenue removeVenue={removeVenue} />}
        />
        <Route path="profile" element={<Profile />} />
        <Route path="create-venue" element={<CreateVenueForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
