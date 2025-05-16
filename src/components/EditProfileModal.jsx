import { X } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";
import { updateProfile } from "../api/profile/update";
import { load } from "../storage/load";
import { save } from "../storage/save";
import { useEffect, useRef } from "react";

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
  const modalRef = useRef(null);

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

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

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
    load("status");
    save("status", data.venueManager);
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
    <div className="overlay">
      <div ref={modalRef} className="modal-div font-poppins">
        <button onClick={onClose} className="btn-close">
          <X />
        </button>
        <h1 className="font-poppins text-l font-semibold text-center py-6 text-green">
          Edit profile
        </h1>
        <div>
          <img
            src={bannerPreview?.trim() || "/images/default-img.png"}
            onError={(e) => (e.target.src = "/images/default-img.png")}
            alt="Banner preview"
            className="w-full h-50 object-cover"
          />
        </div>
        <div>
          <img
            src={avatarPreview?.trim() || "/images/default-img-png"}
            alt="Avatar preview"
            onError={(e) => (e.target.src = "/images/default-img.png")}
            className="absolute top-59 left-6 w-26 h-26 object-cover rounded-full border-3 border-beige drop-shadow-base"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 flex flex-col gap-8 py-4"
        >
          <div className="flex gap-2 mt-10 text-sm">
            <input
              type="checkbox"
              id="manager"
              name="manager"
              className="cursor-pointer"
              {...register("venueManager")}
            />
            <label htmlFor="manager" className="cursor-pointer">
              Venue manager
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <label htmlFor="avatar" className="label-primary">
                Avatar
              </label>
              <p className="text-sm opacity-40">(URL)</p>
            </div>
            <input
              id="avatar"
              {...register("avatar.url")}
              className="input-primary"
            />
            <p className="errorMsgForm">{errors.avatar?.url?.message}</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <label htmlFor="banner" className="label-primary">
                Banner
              </label>
              <p className="text-sm opacity-40">(URL)</p>
            </div>
            <input
              id="banner"
              {...register("banner.url")}
              className="input-primary"
            />
            <p className="errorMsgForm">{errors.banner?.url?.message}</p>
          </div>
          <button
            type="submit"
            className="btn-form bg-orange animate hover mb-4 w-[100px] mx-auto"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
