// src/pages/CrudPage.jsx
// Generic "list + search + add/edit modal + delete" page.
// Each resource page (Products.jsx, Categories.jsx, ...) supplies the
// columns, form fields, and the matching api.<resource> client.
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

  function openEdit(row) {
    setEditingRow(row);
    setSubmitError("");
    setModalOpen(true);
  }

  async function handleSubmit(values) {
    setSubmitting(true);
    setSubmitError("");
    try {
      if (editingRow) {
        await resourceApi.update(editingRow.id, values);
      } else {
        await resourceApi.create(values);
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
