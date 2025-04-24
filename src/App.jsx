import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import SpecificVenue from "./components/SpecificVenue";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import CreateVenue from "./components/CreateVenue";
import { useEffect, useState } from "react";

const API_URL = "https://v2.api.noroff.dev/holidaze/venues?sort=created";

function App() {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setVenues(json.data);
        setFilteredVenues(json.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    }

    fetchVenues();
  }, []);

  const handleSearch = (searchQuery) => {
    if (!searchQuery) {
      setFilteredVenues(venues);
      return;
    }

    const query = searchQuery.toLowerCase();

    const filtered = venues.filter((venue) => {
      const name = venue.name?.toLowerCase() || "";
      const country = venue.location?.country?.toLowerCase() || "";
      const city = venue.location?.city?.toLowerCase() || "";

      return (
        name.includes(query) || country.includes(query) || city.includes(query)
      );
    });
    setFilteredVenues(filtered);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Home venues={filteredVenues} onSearch={handleSearch} />}
        />
        <Route path="venue/:id" element={<SpecificVenue />} />
        <Route path="profile" element={<Profile />} />
        <Route path="create-venue" element={<CreateVenue />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
