import { useState } from "react";
import { X } from "lucide-react";

export default function ImageInput({ onChange }) {
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);

  const handleAddImage = (e) => {
    e.preventDefault();
    const url = imageUrl.trim();

    if (!url) return;

    if (images.some((img) => img.url === url)) {
      setError(true);
      return;
    }

    const newImage = {
      url,
      alt: "Venue image",
    };

    const updateImages = [...images, newImage];
    setImages(updateImages);
    onChange?.(updateImages);
    setImageUrl("");
    setError(false);
  };

  const handleRemoveImage = (urlToRemove) => {
    const updatedImages = images.filter((img) => img.url !== urlToRemove);
    setImages(updatedImages);
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
        {images.map((img) => (
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
