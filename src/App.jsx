import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import SpecificVenue from "./components/SpecificVenue";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import CreateVenue from "./components/CreateVenue";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="venue/:id" element={<SpecificVenue />} />
        <Route path="profile" element={<Profile />} />
        <Route path="create-venue" element={<CreateVenue />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
