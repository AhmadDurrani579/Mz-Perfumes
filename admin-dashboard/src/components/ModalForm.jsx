// src/components/ModalForm.jsx
import { useEffect, useState } from "react";

const EMPTY = {};

export default function ModalForm({
  open,
  title,
  fields,
  initialValues = EMPTY,
  onSubmit,
  onClose,
  submitting,
  submitError,
}) {
  const [values, setValues] = useState({});

  useEffect(() => {
    if (open) {
      const defaults = {};
      fields.forEach((f) => {
        if (f.type === "checkbox") {
          defaults[f.name] =
            initialValues[f.name] ?? f.default ?? false;
        } else {
          defaults[f.name] =
            initialValues[f.name] ?? f.default ?? "";
        }
      });     
      setValues(defaults);
    }
  }, [open, initialValues, fields]);

  if (!open) return null;

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>{title}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__fields">
            {fields.map((field) => (
              <div className="field" key={field.name}>
                <label htmlFor={field.name}>
                  {field.label}
                  {field.required && <span className="field__required">*</span>}
                </label>
                {field.type === "select" ? (
                  <select
                    id={field.name}
                    value={values[field.name] ?? ""}
                    required={field.required}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  >
                    <option value="" disabled>
                      Select {field.label.toLowerCase()}
                    </option>

                    {field.options.map((opt) => {
                      const value = typeof opt === "object" ? opt.value : opt;
                      const label = typeof opt === "object" ? opt.label : opt;

                      return (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                ) : field.type === "textarea" ? (
                <textarea
                id={field.name}
                rows={3}
                value={values[field.name] ?? ""}
                required={field.required}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            ) : field.type === "checkbox" ? (
              <input
                id={field.name}
                type="checkbox"
                checked={Boolean(values[field.name])}
                onChange={(e) => handleChange(field.name, e.target.checked)}
              />
            ) : (
              <input
                id={field.name}
                type={field.type || "text"}
                step={field.type === "number" ? "0.01" : undefined}
                value={values[field.name] ?? ""}
                required={field.required}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}
              </div>
            ))}
          </div>

          {submitError && <p className="modal__error">{submitError}</p>}

          <div className="modal__footer">
            <button
              type="button"
              className="btn btn--outline"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
