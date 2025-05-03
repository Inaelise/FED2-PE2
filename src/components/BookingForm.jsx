import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import { Plus, Minus } from "lucide-react";
import { headers } from "../api/headers";
import { API_HOLIDAZE_BOOKINGS } from "../api/constants";

const schema = yup.object().shape({
  guests: yup.number().required("Please fill out number of guests."),
});

export default function BookingForm({ venueId, maxGuests, price }) {
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

  async function onSubmit() {
    const bookingInfo = {
      dateFrom: dateRange[0].startDate.toISOString(),
      dateTo: dateRange[0].endDate.toISOString(),
      guests: guests,
      venueId,
    };

    const options = {
      method: "POST",
      headers: headers("application/json"),
      body: JSON.stringify(bookingInfo),
    };

    try {
      const response = await fetch(API_HOLIDAZE_BOOKINGS, options);
      if (!response.ok) {
        throw new Error("Booking failed.");
      }
      const json = await response.json();
      console.log("Booking created successfully", json);
    } catch (error) {
      console.error("Error", error);
    }
  }

  const dayCount =
    (dateRange[0].endDate - dateRange[0].startDate) / (1000 * 60 * 60 * 24);
  const totalPrice = guests * dayCount * price;

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
