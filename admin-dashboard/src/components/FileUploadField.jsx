// src/components/FileUploadField.jsx
//
// Used for any field with type: "file" — e.g. Products' main_image_url.
// Picks a file, calls the upload function you passed on the field
// (field.upload, e.g. api.uploads.image), and stores the returned URL
// as the field's value. Shows a small preview once uploaded.
import { useState } from "react";

export default function FileUploadField({ value, onChange, upload, accept = "image/*" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");

    if (!upload) {
      setError("No upload handler configured for this field.");
      return;
    }

    setUploading(true);
    try {
      const url = await upload(file);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = ""; // lets the same file be re-selected later if needed
    }
  }

  function handleClear() {
    onChange("");
  }

  return (
    <div className="file-upload-field">
      {value && (
        <div className="file-upload-field__preview">
          <img src={value} alt="Preview" />
          <button
            type="button"
            className="btn btn--small btn--outline"
            onClick={handleClear}
            disabled={uploading}
          >
            Remove
          </button>
        </div>
      )}

      {!value && (
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={uploading}
        />
      )}

      {uploading && <p className="file-upload-field__status">Uploading…</p>}
      {error && <p className="file-upload-field__error">{error}</p>}
    </div>
  );
}
