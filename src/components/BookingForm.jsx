import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { eachDayOfInterval, parseISO } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import { Plus, Minus, CircleAlert } from "lucide-react";
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
export default function BookingForm({
  venueId,
  maxGuests,
  price,
  activeUser,
  bookings = [],
}) {
  const { showToast } = useToast();
  const [guests, setGuests] = useState(1);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const disabledDates = bookings?.flatMap((booking) =>
    eachDayOfInterval({
      start: parseISO(booking.dateFrom),
      end: parseISO(booking.dateTo),
    })
  );

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center"
    >
      <div className="flex items-center w-full justify-between pt-8 pb-4">
        <p className="text-sm">Select guests</p>
        <div className="flex items-center gap-4">
          <button
            className="guestSelectorBtn animate"
            type="button"
            onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
            disabled={guests === 1}
          >
            <Minus size={14} />
          </button>
          <input
            className="max-w-8 text-center"
            value={guests}
            readOnly
            {...register("guests")}
          />
          <button
            className="guestSelectorBtn"
            type="button"
            onClick={() => setGuests((prev) => Math.min(maxGuests, prev + 1))}
            disabled={guests === maxGuests}
          >
            <Plus size={14} />
          </button>
          {errors.guests && <p>{errors.guests.message}</p>}
        </div>
      </div>
      <div>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDateRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          minDate={new Date()}
          months={1}
          direction="horizontal"
          disabledDates={disabledDates}
        />
      </div>
      <div className="flex justify-center gap-4 py-6">
        <p className="font-bold text-green">Total:</p>
        <p>{totalPrice} kr</p>
      </div>
      <div className="flex justify-center">
        {activeUser ? (
          <button
            type="submit"
            className="text-sm font-semibold bg-orange text-white py-2 px-3 rounded-xl hover animate cursor-pointer"
          >
            Book now
          </button>
        ) : (
          <p className="border-1 border-red p-1.5 bg-[#f28f6b48] text-red font-semibold text-sm flex items-center justify-center gap-2">
            <CircleAlert size={18} />
            Login to make a booking.
          </p>
        )}
      </div>
    </form>
  );
}
