import { X } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";
import { updateProfile } from "../api/profile/update";

const schema = yup.object({
  venueManager: yup.boolean().optional(),
  avatar: yup.object().shape({
    url: yup.string().url("Please enter a valid URL.").optional(),
  }),
  banner: yup.object().shape({
    url: yup.string().url("Please enter a valid URL.").optional(),
  }),
});

/**
 * Modal component for editing user profile information.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} onClose - Function to close the modal.
 * @param {Function} onUpdate - Optional callback invoked with the updated data after a successful update.
 * @param {Object} user - User object containing the current profile data.
 * @returns {JSX.Element} The rendered modal component.
 */
export default function EditProfileModal({ onClose, onUpdate, user }) {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      venueManager: user.venueManager,
      avatar: { url: user.avatar?.url, alt: "User avatar" },
      banner: { url: user.banner?.url, alt: "Profile banner" },
    },
  });

  const avatarPreview = watch("avatar.url");
  const bannerPreview = watch("banner.url");

  /**
   * Handles the form submission for updating the user profile.
   * It sends the updated data to the API and shows a success or error message.
   *
   * @param {Object} data - The form data containing updated profile information (avatar, banner).
   * @returns {Promise<void>} - A promise that resolves when the update is complete.
   */
  async function onSubmit(data) {
    try {
      const updated = await updateProfile(data);
      showToast({ message: "Profile updated successfully!", type: "success" });
      onUpdate?.(updated);
      onClose();
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
  }

  return (
    <div>
      <button onClick={onClose}>
        <X />
      </button>
      <h1>Edit profile</h1>
      <div>
        <img
          src={bannerPreview?.trim() || "/images/default-img.png"}
          onError={(e) => (e.target.src = "/images/default-img.png")}
          alt="Banner preview"
        />
      </div>
      <div>
        <img
          src={avatarPreview?.trim() || "/images/default-img-png"}
          alt="Avatar preview"
          onError={(e) => (e.target.src = "/images/default-img.png")}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="checkbox"
            id="manager"
            name="manager"
            {...register("venueManager")}
          />
          <label htmlFor="manager">Venue manager</label>
        </div>
        <div>
          <div>
            <label htmlFor="avatar">Avatar</label>
            <p>(URL)</p>
          </div>
          <input id="avatar" {...register("avatar.url")} />
          <p>{errors.avatar?.message}</p>
        </div>
        <div>
          <div>
            <label htmlFor="banner">Banner</label>
            <p>(URL)</p>
          </div>
          <input id="banner" {...register("banner.url")} />
          <p>{errors.banner?.message}</p>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
