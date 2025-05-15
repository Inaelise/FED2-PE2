import ImageInput from "./ImageInput";
import Rating from "./Rating";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { createVenue } from "../api/venue/create";

const schema = yup.object({
  name: yup
    .string()
    .max(30, "The venue name can't be longer than 30 characters.")
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
      url: yup.string().url("Please enter a valid URL."),
      alt: yup.string(),
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
 * Create venue component for creating a new venue.
 * Venue managers can create a new venue by filling out the form.
 * On successful submission, the user is redirected to the home page.
 *
 * @returns {JSX.Element} - The rendered component.
 */
export default function CreateVenueForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      media: [],
      rating: 0,
      meta: { wifi: false, parking: false, breakfast: false, pets: false },
      location: {},
    },
  });

  /**
   * Handles the form submission for creating a new venue.
   * It sends the venue data to the API and shows a success or error message.
   *
   * @param {Object} data - The form data containing venue details (name, description, etc.).
   * @returns {Promise<void>} - A promise that resolves when the venue is created successfully.
   */
  async function onCreate(data) {
    try {
      await createVenue(data);

      showToast({ message: "Venue created successfully!", type: "success" });
      navigate("/", { state: { reload: true } });
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
  }

  return (
    <>
      <meta
        name="description"
        content="Create a venue by filling out the form."
      />
      <title>Create venue</title>
      <main className="px-6 py-10 max-w-[486px] mx-auto md:pt-16">
        <h1 className="text-green text-l font-semibold font-poppins pb-8 text-center">
          Create venue
        </h1>
        <form
          onSubmit={handleSubmit(onCreate)}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="label-primary">
              Name
            </label>
            <input
              className="input-primary"
              id="name"
              placeholder="Enter a venue name"
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
              <label className="flex gap-2">
                <input type="checkbox" {...register("meta.wifi")} />
                Free wifi
              </label>
              <label className="flex gap-2">
                <input type="checkbox" {...register("meta.breakfast")} />
                Breakfast
              </label>
              <label className="flex gap-2">
                <input type="checkbox" {...register("meta.parking")} />
                Parking
              </label>
              <label className="flex gap-2">
                <input type="checkbox" {...register("meta.pets")} />
                Pets
              </label>
            </div>
          </fieldset>
          <div>
            <p className="label-primary pb-2">Rating</p>
            <Rating onChange={(value) => setValue("rating", value)} />
          </div>
          <div className="flex flex-col gap-10 justify-between md:flex-row">
            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="label-primary">
                Country
              </label>
              <input
                id="country"
                className="input-primary"
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
                className="input-primary"
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
            onChange={(images) => setValue("media", images)}
          />
          <button type="submit" className="btn-form bg-green hover animate">
            Create venue
          </button>
        </form>
      </main>
    </>
  );
}
