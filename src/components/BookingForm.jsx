import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import { Plus, Minus } from "lucide-react";
import { createBooking } from "../api/venue/booking";
import { useToast } from "../context/ToastContext";

const schema = yup.object().shape({
  guests: yup.number().required("Please fill out number of guests."),
});

/**
 * Booking component for booking a venue.
 *
 * @param {Object} props - The component props.
 * @param {string} venueId - The ID of the venue to be booked.
 * @param {number} maxGuests - The maximum number of guests allowed.
 * @param {number} price - The price per night.
 * @returns {JSX.Element} - The rendered component.
 */
export default function BookingForm({ venueId, maxGuests, price }) {
  const { showToast } = useToast();
  const [guests, setGuests] = useState(1);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  /**
   * Handles the form submission for booking a venue.
   * It sends the booking information to the API and shows a success or error message.
   */
  async function onSubmit() {
    const bookingInfo = {
      dateFrom: dateRange[0].startDate.toISOString(),
      dateTo: dateRange[0].endDate.toISOString(),
      guests: guests,
      venueId,
    };

    try {
      await createBooking(bookingInfo);
      showToast({
        message: "Booking successful! Find bookings in your profile.",
        type: "success",
      });
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
  }

  const dayCount =
    (dateRange[0].endDate - dateRange[0].startDate) / (1000 * 60 * 60 * 24);
  const totalPrice = dayCount * price;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Select guests</p>
      <div>
        <button
          type="button"
          onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
          disabled={guests === 1}
        >
          <Minus />
        </button>
        <input value={guests} readOnly {...register("guests")} />
        <button
          type="button"
          onClick={() => setGuests((prev) => Math.min(maxGuests, prev + 1))}
          disabled={guests === maxGuests}
        >
          <Plus />
        </button>
        {errors.guests && <p>{errors.guests.message}</p>}
      </div>

      <div>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDateRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          minDate={new Date()}
          months={window.innerWidth < 640 ? 1 : 2}
          direction="horizontal"
        />
      </div>
      <div>
        <p>Total:</p>
        <p>{totalPrice} kr</p>
      </div>
      <button>Book now</button>
    </form>
  );
}
