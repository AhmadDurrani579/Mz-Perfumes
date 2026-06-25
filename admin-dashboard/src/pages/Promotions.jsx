// src/pages/Promotions.jsx
import { useEffect, useState } from "react";
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "title", label: "Promotion" },
  { key: "code", label: "Code" },
  {
    key: "discount_percent",
    label: "Discount",
    render: (r) => (r.discount_percent ? `${r.discount_percent}%` : "—"),
  },
  { key: "end_date", label: "Ends" },
  { key: "status", label: "Status", type: "status" },
];

const fields = [
  { name: "title", label: "Promotion title", required: true },
  { name: "code", label: "Promo code", required: true },
  { name: "discount_percent", label: "Discount %", type: "number", required: true },
  { name: "start_date", label: "Start date", type: "date" },
  { name: "end_date", label: "End date", type: "date" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["active", "scheduled", "expired", "inactive"],
    default: "active",
  },
];

function ActivePromotionsStrip() {
  const [active, setActive] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    api.promotions
      .activeList()
      .then((data) => {
        if (live) setActive(Array.isArray(data) ? data : data?.results || []);
      })
      .catch((err) => {
        if (live) setError(err.message || "Couldn't load active promotions.");
      });
    return () => {
      live = false;
    };
  }, []);

  return (
    <div className="page__card promotions-strip">
      <h3>Currently active</h3>
      {error && <p className="alert alert--error">{error}</p>}
      {!error && active.length === 0 && (
        <p className="page__description">No promotions are live right now.</p>
      )}
      {!error && active.length > 0 && (
        <div className="chip-row">
          {active.map((promo) => (
            <span className="chip" key={promo.id}>
              {promo.title} · {promo.code}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Promotions() {
  return (
    <>
      <ActivePromotionsStrip />
      <CrudPage
        title="Promotions"
        description="Discount codes and limited-time offers."
        resourceApi={api.promotions}
        columns={columns}
        fields={fields}
        searchKeys={["title", "code"]}
        searchPlaceholder="Search promotions…"
        DataTable={DataTable}
        ModalForm={ModalForm}
        emptyLabel="No promotions yet."
      />
    </>
  );
}
