import ImageInput from "./ImageInput";
import Rating from "./Rating";
import { X } from "lucide-react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, useRef } from "react";
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
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("Please enter a number.")
    .positive("Please enter a positive number.")
    .required("Please enter a price."),
  maxGuests: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("Please enter a number.")
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
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

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
    <div className="overlay">
      <div
        ref={modalRef}
        className="modal-div top-10 max-w-[750px] max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} className="btn-close">
          <X />
        </button>
        <h1 className="modal-h1 text-green">Edit venue</h1>
        <form
          onSubmit={handleSubmit(onUpdateVenue)}
          className="flex flex-col gap-10 px-6 max-w-[500px] mx-auto pb-16"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="label-primary">
              Name
            </label>
            <input
              id="name"
              autoComplete="on"
              placeholder="Enter a venue name"
              className="input-primary"
              {...register("name")}
            />
            <p className="errorMsgForm">{errors.name?.message}</p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="label-primary">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter a description"
              className="input-primary h-40"
              {...register("description")}
            />
            <p className="errorMsgForm">{errors.description?.message}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <label htmlFor="price" className="label-primary">
                  Price
                </label>
                <p className="text-sm opacity-40">(Per night)</p>
              </div>
              <input
                id="price"
                className="input-primary max-w-30"
                {...register("price")}
              />
              <p className="errorMsgForm max-w-30 h-[50px]">
                {errors.price?.message}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="guests" className="label-primary">
                Max guests
              </label>
              <input
                id="guests"
                className="input-primary max-w-30"
                {...register("maxGuests")}
              />
              <p className="errorMsgForm max-w-30 h-[50px]">
                {errors.maxGuests?.message}
              </p>
            </div>
          </div>
          <fieldset>
            <legend className="label-primary">Amenities</legend>
            <div className="grid grid-cols-2 grid-rows-2 gap-8 text-sm py-4">
              <label htmlFor="wifi" className="flex gap-2">
                <input id="wifi" type="checkbox" {...register("meta.wifi")} />
                Free wifi
              </label>
              <label htmlFor="breakfast" className="flex gap-2">
                <input
                  id="breakfast"
                  type="checkbox"
                  {...register("meta.breakfast")}
                />
                Breakfast
              </label>
              <label htmlFor="parking" className="flex gap-2">
                <input
                  id="parking"
                  type="checkbox"
                  {...register("meta.parking")}
                />
                Parking
              </label>
              <label htmlFor="pets" className="flex gap-2">
                <input id="pets" type="checkbox" {...register("meta.pets")} />
                Pets
              </label>
            </div>
          </fieldset>
          <div className="flex flex-col gap-1">
            <p className="label-primary pb-2">Rating</p>
            <Rating
              value={watch("rating")}
              onChange={(val) => setValue("rating", val)}
            />
          </div>
          <div className="flex flex-col gap-10 justify-between md:flex-row">
            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="label-primary">
                Country
              </label>
              <input
                id="country"
                autoComplete="on"
                className="input-primary md:w-[193px]"
                {...register("location.country")}
              />
              <p className="errorMsgForm">
                {errors.location?.country?.message}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="city" className="label-primary">
                City
              </label>
              <input
                id="city"
                autoComplete="on"
                className="input-primary md:w-[193px]"
                {...register("location.city")}
              />
              <p className="errorMsgForm">{errors.location?.city?.message}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="address" className="label-primary">
              Address
            </label>
            <input
              id="address"
              autoComplete="on"
              className="input-primary"
              {...register("location.address")}
            />
            <p className="errorMsgForm">{errors.location?.address?.message}</p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="zip" className="label-primary">
              Zip code
            </label>
            <input
              id="zip"
              className="input-primary"
              {...register("location.zip")}
            />
            <p className="errorMsgForm">{errors.location?.zip?.message}</p>
          </div>
          <ImageInput
            value={watch("media")}
            onChange={(imgs) => setValue("media", imgs)}
          />
          <div className="flex justify-between gap-4 pt-6">
            <button
              type="submit"
              className="btn-form bg-green max-w-[170px] hover animate"
            >
              Update
            </button>
            <button
              type="button"
              className="btn-form bg-red max-w-[170px] hover animate"
              onClick={() => setShowConfirmation(true)}
            >
              Delete venue
            </button>
          </div>
        </form>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          title="Delete venue"
          message={`Are you sure you want to delete venue with id:${venue.id}? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
}
