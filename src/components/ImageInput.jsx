import { useState } from "react";
import { X } from "lucide-react";

/**
 * A controlled input component for adding and removing images.
 * Allows users to add image URLs and displays a list of added images, prevents duplicates, and allows removal of images.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} onChange - Callback function to handle changes in the image list.
 * @param {Array<Object>} value=[] - Current list of image objects.
 * @returns {JSX.Element} The rendered component.
 */
export default function ImageInput({ onChange, value = [] }) {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(false);

  /**
   * Handles adding a new image to the list.
   * Prevents duplicates and validates input.
   *
   * @param {Event} e - The event triggered by the add button click.
   */
  const handleAddImage = (e) => {
    e.preventDefault();
    const url = imageUrl.trim();

    if (!url) return;

    if (value.some((img) => img.url === url)) {
      setError(true);
      return;
    }

    const newImage = {
      url,
      alt: "Venue image",
    };

    const updateImages = [...value, newImage];
    onChange?.(updateImages);
    setImageUrl("");
    setError(false);
  };

  /**
   * Handles removing an image from the list.
   *
   * @param {string} urlToRemove - The URL of the image to be removed.
   */
  const handleRemoveImage = (urlToRemove) => {
    const updatedImages = value.filter((img) => img.url !== urlToRemove);
    onChange?.(updatedImages);
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <label htmlFor="images" className="label-primary">
            Images
          </label>
          <p className="opacity-40">(URL)</p>
        </div>
        <div className="flex flex-col gap-4">
          <input
            id="images"
            placeholder="https://exampleurl.com"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              if (error) setError(false);
            }}
            className="input-primary"
          />
          <button
            onClick={handleAddImage}
            className="bg-green text-white font-poppins font-semibold w-20 py-2 mx-auto rounded-2xl hover:bg-[#2c3a2d] animate cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
      {error && <p>Image already added. Try a different url.</p>}

      <div className="flex justify-center gap-6 flex-wrap">
        {value.map((img) => (
          <div key={img.url} className="relative">
            <img
              src={img.url}
              alt={img.alt}
              className="w-28 h-28 object-cover rounded-2xl drop-shadow-base"
            />
            <button
              onClick={() => handleRemoveImage(img.url)}
              className="absolute top-1 right-1 bg-white rounded-full p-1 drop-shadow-s"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
