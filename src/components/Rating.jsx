import starFilled from "/images/filled-star.png";
import starEmpty from "/images/empty-star.png";
import { useState, useEffect } from "react";

/**
 * A star rating component that allows users to select a rating from 1 to 5 stars.
 * Supports hover effects to preview ratings before selection.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} onChange - Callback function to handle rating changes.
 * @param {number} value - Current rating value (default is 0).
 * @returns {JSX.Element} The rendered component.
 */
export default function Rating({ onChange, value = 0 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setRating(value);
  }, [value]);

  /**
   * Handles the user clicking on a star to set the rating.
   *
   * @param {number} val - The rating value selected by the user.
   */
  function handleClick(val) {
    setRating(val);
    onChange(val);
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = (hover || rating) >= star;
        const img = isActive ? starFilled : starEmpty;
        return (
          <img
            key={star}
            src={img}
            alt={isActive ? "Filled star" : "Empty star"}
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="h-7 w-7 cursor-pointer transition-transform hover:scale-110"
          />
        );
      })}
      <p className="font-poppins px-2">{rating}</p>
    </div>
  );
}
