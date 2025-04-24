import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import SpecificVenue from "./components/SpecificVenue";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import CreateVenue from "./components/CreateVenue";
import { useEffect, useState } from "react";

const API_URL = "https://v2.api.noroff.dev/holidaze/venues";

function App() {
  const [venues, setVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    console.log("Fetching venues...", currentPage, searchQuery);
    async function fetchVenues(page = currentPage, query = searchQuery) {
      try {
        const baseUrl = query
          ? `https://v2.api.noroff.dev/holidaze/venues/search?q=${encodeURIComponent(
              query
            )}`
          : API_URL;

        const url = new URL(baseUrl);
        url.searchParams.append("limit", 9);
        url.searchParams.append("page", page);
        url.searchParams.append("sort", "created");

        const response = await fetch(url);
        const json = await response.json();
        console.log(json);

        setVenues(json.data);
        setMeta(json.meta);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    }
    fetchVenues(currentPage, searchQuery);
  }, [searchQuery, currentPage]);

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
        <Route path="venue/:id" element={<SpecificVenue />} />
        <Route path="profile" element={<Profile />} />
        <Route path="create-venue" element={<CreateVenue />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
