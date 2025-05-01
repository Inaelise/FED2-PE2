import { useEffect, useState } from "react";
import { API_HOLIDAZE_PROFILES } from "../api/constants";
import { load } from "../storage/load";
import { headers } from "../api/headers";

export default function Profile() {
  const [user, setUser] = useState({});
  const activeUser = load("user");

  useEffect(() => {
    const apiUrl = `${API_HOLIDAZE_PROFILES}/${activeUser}?_bookings=true&_venues=true`;

    async function fetchProfile() {
      const options = {
        method: "GET",
        headers: headers("application/json"),
      };
      try {
        const response = await fetch(apiUrl, options);
        const json = await response.json();
        setUser(json.data);
        console.log(json);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    fetchProfile();
  }, [activeUser]);

  return (
    <>
      <meta
        name="description"
        content={`This is the profile of ${user.name}.`}
      />
      <title>{user.name}</title>
      <main>
        <img src={user.banner.url} alt={user.banner.alt} />
        <div>
          <img src={user.avatar.url} alt={user.avatar.alt} />
          <div>
            <h1>{user.name}</h1>
            <p>{user.venueManager ? "Venue manager" : "Customer"}</p>
          </div>
          <button title="Click to edit profile">Edit profile</button>
        </div>
        <div>{/* Add accordion here */}</div>
      </main>
    </>
  );
}
