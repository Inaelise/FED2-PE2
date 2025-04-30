import ImageInput from "./ImageInput";
import Rating from "./Rating";
import { X } from "lucide-react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { headers } from "../api/headers";
import { API_HOLIDAZE_VENUES } from "../api/constants";
import { useEffect } from "react";

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

export default function EditVenueModal({ venue, onClose, onUpdate }) {
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

  async function updateVenue(data) {
    const options = {
      method: "PUT",
      headers: headers("application/json"),
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        `${API_HOLIDAZE_VENUES}/${venue.id}`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to update venue.");
      }
      const json = await response.json();
      console.log("Venue updated successfully:", json);
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
      <h1>Edit venue</h1>
      <form onSubmit={handleSubmit(updateVenue)}>
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
          <button type="button">Delete venue</button>
        </div>
      </form>
    </div>
  );
}
