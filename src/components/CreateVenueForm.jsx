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
    .positive("Please enter a positive number.")
    .required("Please enter a price."),
  maxGuests: yup
    .number()
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
      <main>
        <h1>Create venue</h1>
        <form onSubmit={handleSubmit(onCreate)}>
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
            <Rating onChange={(value) => setValue("rating", value)} />
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
            onChange={(images) => setValue("media", images)}
          />
          <button type="submit">Create venue</button>
        </form>
      </main>
    </>
  );
}
