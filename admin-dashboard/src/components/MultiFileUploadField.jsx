// src/components/MultiFileUploadField.jsx
import { useState } from "react";

export default function MultiFileUploadField({
  value = [],
  onChange,
  upload,
  accept = "image/*",
  maxFiles = 4,
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const images = Array.isArray(value) ? value : [];

  async function handleFileChange(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (images.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed.`);
      e.target.value = "";
      return;
    }

    setError("");
    setUploading(true);

    try {
      const uploadedUrls = [];

      for (const file of files) {
        const url = await upload(file);
        uploadedUrls.push(url);
      }

      onChange([...images, ...uploadedUrls]);
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function handleRemove(index) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div className="file-upload-field">
      {images.length > 0 && (
        <div className="file-upload-field__preview-list">
          {images.map((url, index) => (
            <div key={url} className="file-upload-field__preview">
              <img src={url} alt={`Product ${index + 1}`} />
              <button
                type="button"
                className="btn btn--small btn--outline"
                onClick={() => handleRemove(index)}
                disabled={uploading}
              >
                Remove
              </button>
              {index === 0 && <small>Primary</small>}
            </div>
          ))}
        </div>
      )}

      {images.length < maxFiles && (
        <input
          type="file"
          accept={accept}
          multiple
          onChange={handleFileChange}
          disabled={uploading}
        />
      )}

      {uploading && <p className="file-upload-field__status">Uploading…</p>}
      {error && <p className="file-upload-field__error">{error}</p>}
    </div>
  );
}