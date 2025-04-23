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

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setVenues(json.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    }

    fetchVenues();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home venues={venues} />} />
        <Route path="venue/:id" element={<SpecificVenue />} />
        <Route path="profile" element={<Profile />} />
        <Route path="create-venue" element={<CreateVenue />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
