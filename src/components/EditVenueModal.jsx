import ImageInput from "./ImageInput";
import Rating from "./Rating";
import { X } from "lucide-react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { updateVenue } from "../api/venue/update";
import { deleteVenue } from "../api/venue/delete";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { useToast } from "../context/ToastContext";

const schema = yup.object({
  name: yup
    .string()
    .max(30, "The venue name can't be longer than 20 characters.")
    .required("Please enter a venue name."),
  description: yup.string().required("Please enter a description."),
  price: yup
    .number()
    .positive("Please enter a positive number.")
    .required("Please enter a price."),
  maxGuests: yup
    .number()
    .positive("Please enter a positive number.")
    .required("Please enter the max number of guests."),
  rating: yup.number().max(5),
  media: yup.array().of(
    yup.object().shape({
      url: yup.string().url("Please enter a valid URL.").optional(),
    })
  ),
  meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
  location: yup.object().shape({
    country: yup.string().required("Please enter a country."),
    city: yup.string().required("Please enter a city."),
    address: yup.string().required("Please enter an address."),
    zip: yup.string().required("Please enter a zip code."),
  }),
});

/**
 * Modal component for editing a venue.
 *
 * @param {Object} props - The component props.
 * @param {Object} venue - The venue object to be edited.
 * @param {Function} onClose - Function to close the modal.
 * @param {Function} onUpdate - Function to handle the updated venue data.
 * @param {Function} removeVenue - Function to delete the venue from the list.
 * @returns {JSX.Element} - The rendered modal component.
 */
export default function EditVenueModal({
  venue,
  onClose,
  onUpdate,
  removeVenue,
}) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (venue) {
      reset(venue);

      setValue("rating", venue.rating || 0);
      setValue("media", venue.media || []);
    }
  }, [venue, reset, setValue]);

  /**
   * Handles the deletion of a venue.
   * It sends a delete request to the API and shows a success or error message.
   * @returns {Promise<void>} - A promise that resolves when the venue is deleted successfully.
   */
  async function handleDelete() {
    setIsDeleted(true);
    try {
      await deleteVenue(venue.id);
      showToast({ message: "Venue deleted successfully!", type: "success" });
      removeVenue(venue.id);
      navigate("/");
    } catch (error) {
      showToast({
        message: error.message,
        type: "error",
      });
    }
  }

  /**
   * Handles the form submission for updating a venue.
   * It sends the updated venue data to the API and shows a success or error message.
   *
   * @param {Object} data - The form data containing updated venue details (name, description, etc.).
   * @returns {Promise<void>} - A promise that resolves when the venue is updated successfully.
   */
  async function onUpdateVenue(data) {
    if (isDeleted) return;

    try {
      const updatedVenue = await updateVenue(venue.id, data);
      showToast({ message: "Venue updated successfully!", type: "success" });
      onUpdate?.(updatedVenue);
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
      <h1>Edit venue</h1>
      <form onSubmit={handleSubmit(onUpdateVenue)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Enter a venue name"
            {...register("name")}
          />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter a description"
            {...register("description")}
          />
          <p>{errors.description?.message}</p>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <p>(Per night)</p>
          <input id="price" {...register("price")} />
          <p>{errors.price?.message}</p>
        </div>
        <div>
          <label htmlFor="guests">Max guests</label>
          <input id="guests" {...register("maxGuests")} />
          <p>{errors.guests?.message}</p>
        </div>
        <fieldset>
          <legend>Amenities</legend>
          <div>
            <label>
              <input type="checkbox" {...register("meta.wifi")} />
              Free wifi
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" {...register("meta.breakfast")} />
              Breakfast
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" {...register("meta.parking")} />
              Parking
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" {...register("meta.pets")} />
              Pets
            </label>
          </div>
        </fieldset>
        <div>
          <p>Rating</p>
          <Rating
            value={watch("rating")}
            onChange={(val) => setValue("rating", val)}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input id="country" {...register("location.country")} />
          <p>{errors.country?.message}</p>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input id="city" {...register("location.city")} />
          <p>{errors.city?.message}</p>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input id="address" {...register("location.address")} />
          <p>{errors.address?.message}</p>
        </div>
        <div>
          <label htmlFor="zip">Zip code</label>
          <input id="zip" {...register("location.zip")} />
          <p>{errors.zip?.message}</p>
        </div>
        <ImageInput
          value={watch("media")}
          onChange={(imgs) => setValue("media", imgs)}
        />
        <div>
          <button type="submit">Update</button>
          <button type="button" onClick={() => setShowConfirmation(true)}>
            Delete venue
          </button>
          {showConfirmation && (
            <ConfirmationModal
              title="Delete venue"
              message={`Are you sure you want to delete venue with id:${venue.id}? This action cannot be undone.`}
              onConfirm={handleDelete}
              onCancel={() => setShowConfirmation(false)}
            />
          )}
        </div>
      </form>
    </div>
  );
}
