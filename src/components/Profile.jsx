import { useEffect, useState } from "react";
import { API_HOLIDAZE_PROFILES } from "../api/constants";
import { load } from "../storage/load";
import { headers } from "../api/headers";
import EditProfileModal from "./EditProfileModal";
import ProfileAccordion from "./ProfileAccordion";
import LoadingSpinner from "./LoadingSpinner";
import { CircleAlert } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const activeUser = load("user");

  useEffect(() => {
    const apiUrl = `${API_HOLIDAZE_PROFILES}/${activeUser}?_bookings=true&_venues=true`;

    async function fetchProfile() {
      const options = {
        method: "GET",
        headers: headers("application/json"),
      };

      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch(apiUrl, options);
        const json = await response.json();

        if (!response.ok) {
          const errorMessage = json.errors
            .map((error) => error.message)
            .join("\r\n");
          throw new Error(errorMessage);
        }

        setUser(json.data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [activeUser]);

  const handleUpdate = (updatedProfile) => {
    setUser(updatedProfile);
    setOpenModal(false);
  };

  return (
    <>
      <meta
        name="description"
        content={`This is the profile of ${user?.name || "User undefined"}.`}
      />
      <title>{user.name || "User profile"}</title>

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <div>
          <CircleAlert />
          <p>Oops, something went wrong. Could not find profile.</p>
        </div>
      ) : (
        <main>
          <img className="w-50" src={user.banner?.url} alt={user.banner?.alt} />
          <div>
            <img
              className="w-50"
              src={user.avatar?.url}
              alt={user.avatar?.alt}
            />
            <div>
              <h1>{user.name}</h1>
              <p>{user.venueManager ? "Venue manager" : "Customer"}</p>
            </div>
            <button
              title="Click to edit profile"
              onClick={() => setOpenModal(true)}
            >
              Edit profile
            </button>
            {openModal && (
              <EditProfileModal
                onClose={() => setOpenModal(false)}
                onUpdate={handleUpdate}
                user={user}
              />
            )}
          </div>
          <div>{<ProfileAccordion user={user} />}</div>
        </main>
      )}
    </>
  );
}
