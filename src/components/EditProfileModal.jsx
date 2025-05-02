import { X } from "lucide-react";
import { headers } from "../api/headers";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { API_HOLIDAZE_PROFILES } from "../api/constants";
import { load } from "../storage/load";

const schema = yup.object({
  venueManager: yup.boolean().optional(),
  avatar: yup.object().shape({
    url: yup.string().url("Please enter a valid URL.").optional(),
  }),
  banner: yup.object().shape({
    url: yup.string().url("Please enter a valid URL.").optional(),
  }),
});

export default function EditProfileModal({ onClose, onUpdate, user }) {
  const activeUser = load("user");
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

  async function updateProfile({ venueManager, avatar, banner }) {
    const options = {
      method: "PUT",
      headers: headers("application/json"),
      body: JSON.stringify({ venueManager, avatar, banner }),
    };

    try {
      const response = await fetch(
        `${API_HOLIDAZE_PROFILES}/${activeUser}`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }
      const json = await response.json();
      console.log("Profile updated successfully:", json);
      onUpdate?.(json.data);
      onClose();
    } catch (error) {
      console.error("Error:", error);
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
      <form onSubmit={handleSubmit(updateProfile)}>
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
