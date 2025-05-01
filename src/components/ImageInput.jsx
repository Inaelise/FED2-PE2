import { useState } from "react";
import { X } from "lucide-react";

export default function ImageInput({ onChange, value = [] }) {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(false);

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
