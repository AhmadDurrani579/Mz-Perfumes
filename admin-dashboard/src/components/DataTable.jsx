// src/components/DataTable.jsx
import { useMemo, useState } from "react";

export function StatusBadge({ value }) {
  const normalized = String(value || "").toLowerCase();
  const tone = ["active", "completed", "approved", "paid"].includes(
    normalized
  )
    ? "success"
    : ["pending", "draft", "processing"].includes(normalized)
    ? "pending"
    : ["inactive", "cancelled", "rejected", "expired"].includes(normalized)
    ? "danger"
    : "neutral";

  return <span className={`badge badge--${tone}`}>{value || "—"}</span>;
}

export default function DataTable({
  columns,
  rows,
  loading,
  error,
  searchPlaceholder = "Search…",
  searchKeys = [],
  onEdit,
  onDelete,
  emptyLabel = "No records yet.",
}) {
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((row) =>
      (searchKeys.length ? searchKeys : Object.keys(row)).some((key) =>
        String(row[key] ?? "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [rows, query, searchKeys]);

  return (
    <div className="data-table">
      <div className="data-table__toolbar">
        <div className="search-box">
          <span className="search-box__icon">⌕</span>
          <input
            type="text"
            value={query}
            placeholder={searchPlaceholder}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <span className="data-table__count">
          {filteredRows.length} record{filteredRows.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="data-table__scroll">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
              <th className="data-table__actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={columns.length + 1} className="data-table__state">
                  Loading records…
                </td>
              </tr>
            )}

            {!loading && error && (
              <tr>
                <td colSpan={columns.length + 1} className="data-table__state data-table__state--error">
                  {error}
                </td>
              </tr>
            )}

            {!loading && !error && filteredRows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="data-table__state">
                  {emptyLabel}
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              filteredRows.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.type === "status" ? (
                        <StatusBadge value={row[col.key]} />
                      ) : col.render ? (
                        col.render(row)
                      ) : (
                        String(row[col.key] ?? "—")
                      )}
                    </td>
                  ))}
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn btn--small btn--outline"
                        onClick={() => onEdit(row)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn--small btn--danger"
                        onClick={() => onDelete(row)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
