import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import SpecificVenue from "./components/SpecificVenue";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import CreateVenueForm from "./components/CreateVenueForm";
import { useEffect, useState } from "react";
import { API_HOLIDAZE_VENUES } from "./api/constants";
import { useLocation } from "react-router-dom";

function App() {
  const [venues, setVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchVenues(page = currentPage, query = searchQuery) {
      try {
        const baseUrl = query
          ? `${API_HOLIDAZE_VENUES}/search?q=${encodeURIComponent(query)}`
          : API_HOLIDAZE_VENUES;

        const url = new URL(baseUrl);
        url.searchParams.append("limit", 9);
        url.searchParams.append("page", page);
        url.searchParams.append("sort", "created");

        const response = await fetch(url);
        const json = await response.json();

        setVenues(json.data);
        setMeta(json.meta);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    }
    fetchVenues(currentPage, searchQuery);
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, venues]);

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
