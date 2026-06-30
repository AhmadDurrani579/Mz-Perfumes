// src/pages/CrudPage.jsx
// Generic "list + search + add/edit modal + delete" page.
// Each resource page (Products.jsx, Categories.jsx, ...) supplies the
// columns, form fields, and the matching api.<resource> client.
//
// Three new props are additive only — every page that doesn't pass them
// (Categories, Brands, etc.) behaves exactly as before:
//
//   loadExtra(row)        — called when opening Edit; merges its return
//                            value into the form's initial values. Used
//                            by Products to fetch a product's existing
//                            sizes so the form opens pre-filled.
//   afterSave(saved, vals) — called after the main record is
//                            created/updated. Used by Products to
//                            create/update/delete the size rows to match
//                            what's in the form.
//   extraFieldKeys         — field names that exist in the form but
//                            aren't part of this resource's own payload
//                            (e.g. "variants") — stripped out before
//                            calling resourceApi.create/update.
import { useEffect, useState, useCallback } from "react";

export default function CrudPage({
  title,
  description,
  resourceApi,
  columns,
  fields,
  searchKeys,
  searchPlaceholder,
  DataTable,
  ModalForm,
  emptyLabel,
  loadExtra,
  afterSave,
  extraFieldKeys = [],
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await resourceApi.list();
      setRows(Array.isArray(data) ? data : data?.results || []);
    } catch (err) {
      setError(err.message || "Couldn't load records.");
    } finally {
      setLoading(false);
    }
  }, [resourceApi]);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditingRow(null);
    setSubmitError("");
    setModalOpen(true);
  }

  async function openEdit(row) {
    setSubmitError("");
    if (loadExtra) {
      try {
        const extra = await loadExtra(row);
        setEditingRow({ ...row, ...extra });
      } catch {
        // If the related data fails to load, still let them edit the
        // main record — they just won't see the nested rows prefilled.
        setEditingRow(row);
      }
    } else {
      setEditingRow(row);
    }
    setModalOpen(true);
  }

  function stripExtraFields(values) {
    if (!extraFieldKeys.length) return values;
    const clean = { ...values };
    extraFieldKeys.forEach((key) => delete clean[key]);
    return clean;
  }

  async function handleSubmit(values) {
    setSubmitting(true);
    setSubmitError("");
    try {
      const payload = stripExtraFields(values);
      let savedRow;
      if (editingRow) {
        const updated = await resourceApi.update(editingRow.id, payload);
        savedRow = updated || { ...editingRow, ...payload, id: editingRow.id };
      } else {
        savedRow = await resourceApi.create(payload);
      }

      if (afterSave) {
        await afterSave(savedRow, values);
      }

      setModalOpen(false);
      await load();
    } catch (err) {
      setSubmitError(err.message || "Couldn't save this record.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(row) {
    const label = row.name || row.title || row.order_number || `#${row.id}`;
    if (!window.confirm(`Delete "${label}"? This can't be undone.`)) return;
    try {
      await resourceApi.remove(row.id);
      setRows((prev) => prev.filter((r) => r.id !== row.id));
    } catch (err) {
      window.alert(err.message || "Couldn't delete this record.");
    }
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h2>{title}</h2>
          {description && <p className="page__description">{description}</p>}
        </div>
        <button className="btn btn--primary" onClick={openCreate}>
          + Add {title.replace(/s$/, "")}
        </button>
      </div>

      <div className="page__card">
        <DataTable
          columns={columns}
          rows={rows}
          loading={loading}
          error={error}
          searchKeys={searchKeys}
          searchPlaceholder={searchPlaceholder}
          onEdit={openEdit}
          onDelete={handleDelete}
          emptyLabel={emptyLabel}
        />
      </div>

      <ModalForm
        open={modalOpen}
        title={editingRow ? `Edit ${title.replace(/s$/, "")}` : `Add ${title.replace(/s$/, "")}`}
        fields={fields}
        initialValues={editingRow || {}}
        onSubmit={handleSubmit}
        onClose={() => setModalOpen(false)}
        submitting={submitting}
        submitError={submitError}
      />
    </div>
  );
}
