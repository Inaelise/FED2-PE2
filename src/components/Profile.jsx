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
   * Handles the profile updates after submit. It merges the updated profile data into the local state, and refetch the full profile from the API. It also updates the user state with the full, fresh profile, and closes the modal.
   *
   * @param {Object} updatedProfile - The updated profile data returned after editing.
   * @param {Object} avatar - The avatar object containing the URL and alt text.
   * @param {Object} banner - The banner object containing the URL and alt text.
   * @param {boolean} venueManager - Updated venue manager status.
   */
  const handleUpdate = async (updatedProfile) => {
    try {
      setIsLoading(true);
      setUser((prev) => ({ ...prev, ...updatedProfile }));

      const fullProfile = await getProfile(activeUser);
      setUser(fullProfile);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setOpenModal(false);
    }
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
        <div className="oopsMsg">
          <CircleAlert size={32} color="#f28f6b" />
          <p>Oops, something went wrong. Could not find profile.</p>
        </div>
      ) : (
        <main className="font-inter">
          <div>
            <img
              className="w-full h-42 object-cover sm:h-62 xl:h-82"
              src={user.banner?.url}
              alt={user.banner?.alt}
            />
            <div className="bg-beige relative flex">
              <div className="relative w-[1000px] mx-auto">
                <img
                  className="absolute bottom-4 ml-2 w-26 h-26 object-cover rounded-full border-3 border-beige drop-shadow-base z-5 sm:ml-6"
                  src={user.avatar?.url}
                  alt={user.avatar?.alt}
                />
                <div className="flex justify-between gap-3 pl-30 pr-2 py-4 items-center sm:pl-36">
                  <div>
                    <h1 className="font-bold">{user.name}</h1>
                    <p className="text-xs opacity-30 font-semibold">
                      {user.venueManager ? "Venue manager" : "Customer"}
                    </p>
                  </div>
                  <div className="absolute right-2 sm:right-6">
                    <button
                      className="text-xs font-semibold text-orange border-1 p-2 rounded-xl animate hover:bg-orange hover:text-white hover cursor-pointer"
                      title="Click to edit profile"
                      onClick={() => setOpenModal(true)}
                    >
                      Edit profile
                    </button>
                  </div>
                </div>
                {openModal && (
                  <EditProfileModal
                    onClose={() => setOpenModal(false)}
                    onUpdate={handleUpdate}
                    user={user}
                  />
                )}
              </div>
            </div>
          </div>
          <div>{<ProfileAccordion user={user} />}</div>
        </main>
      )}
    </>
  );
}
