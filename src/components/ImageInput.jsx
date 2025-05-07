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
    <div>
      <div>
        <label htmlFor="images">Images</label>
        <p>(URL)</p>
      </div>
      <input
        id="images"
        placeholder="https://exampleurl.com"
        value={imageUrl}
        onChange={(e) => {
          setImageUrl(e.target.value);
          if (error) setError(false);
        }}
      />
      <button onClick={handleAddImage}>Add</button>
      {error && <p>Image already added. Try a different url.</p>}
      <div>
        {value.map((img) => (
          <div key={img.url}>
            <img src={img.url} alt={img.alt} />
            <button onClick={() => handleRemoveImage(img.url)}>
              <X />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
