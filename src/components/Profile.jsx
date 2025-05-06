import { useEffect, useState } from "react";
import { load } from "../storage/load";
import EditProfileModal from "./EditProfileModal";
import ProfileAccordion from "./ProfileAccordion";
import LoadingSpinner from "./LoadingSpinner";
import { CircleAlert } from "lucide-react";
import { getProfile } from "../api/profile/read";

/**
 * Profile component that displays user information and allows editing.
 *
 * @component
 * @param {Object} props - Component props.
 * @returns {JSX.Element} The rendered profile component.
 */
export default function Profile() {
  const [user, setUser] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const activeUser = load("user");

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);
      setIsError(false);

      try {
        const profile = await getProfile(activeUser);
        setUser(profile);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [activeUser]);

  /**
   * Updates the user profile state with the new data and closes the modal.
   * This function is passed as a callback to the "EditProfileModal" to handle the updated data after editing.
   *
   * @param {Object} updatedProfile - The updated profile data returned after editing.
   * @param {string} name - The name of the user.
   * @param {Object} avatar - The avatar object containing the URL and alt text.
   * @param {Object} banner - The banner object containing the URL and alt text.
   * @param {boolean} venueManager - Whether the user is a venue manager.
   */
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
