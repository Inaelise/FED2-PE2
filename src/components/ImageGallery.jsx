import { useState } from "react";

/**
 * Image gallery component that displays a main image and thumbnails.
 * If there are multiple images, it allows the user to click on thumbnails to change the main image which is displayed in a larger view.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} media - Array of media objects containing image URLs and alt text.
 * @returns {JSX.Element} The rendered component.
 */
export default function ImageGallery({ media }) {
  const [mainImage, setMainImage] = useState(media?.[0]);

  if (!media || media.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div>
      <div>
        <img
          src={mainImage.url}
          alt={mainImage.alt}
          className="w-full h-76 object-cover max-w-[754px] mx-auto sm:h-96 md:h-[540px] md:rounded-xl"
        />
      </div>

      {media.length > 1 && (
        <div className="flex flex-wrap justify-center gap-4 py-4 px-2">
          {media.map(
            (img) =>
              img.url && (
                <img
                  key={img.url}
                  src={img.url}
                  alt={img.alt}
                  onClick={() => setMainImage(img)}
                  className={`h-20 w-20 object-cover rounded-xl cursor-pointer animate ${
                    mainImage.url === img.url
                      ? "ring-3 ring-orange scale-110 animate"
                      : ""
                  }`}
                />
              )
          )}
        </div>
      )}
    </div>
  );
}
