import { useState } from "react";

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
          className="w-full h-96 object-cover rounded-xl"
        />
      </div>

      {media.length > 1 && (
        <div>
          {media.map(
            (img) =>
              img.url && (
                <img
                  key={img.url}
                  src={img.url}
                  alt={img.alt}
                  onClick={() => setMainImage(img)}
                  className={`h-24 w-32 object-cover rounded cursor-pointer transition-transform duration-300 ${
                    mainImage.url === img.url
                      ? "ring-4 ring-blue-500 scale-105"
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
