import starFilled from "/images/filled-star.png";
import starEmpty from "/images/empty-star.png";
import { useState, useEffect } from "react";

export default function Rating({ onChange, value = 0 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setRating(value);
  }, [value]);

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
      <p>({rating})</p>
    </div>
  );
}
