// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { api } from "../api/api";

const CARD_DEFS = [
  { key: "total_products", label: "Products", icon: "*" },
  { key: "total_orders", label: "Orders", icon: "#" },
  { key: "pending_orders", label: "Pending Orders", icon: "!" },
  { key: "total_affiliates", label: "Affiliates", icon: "A" },
  { key: "total_brands", label: "Brands", icon: "B" },
  { key: "total_partner_brands", label: "Partner Brands", icon: "PB" },
  { key: "total_partner_products", label: "Partner Products", icon: "PP" },
  { key: "total_revenue", label: "Revenue", icon: "$", isCurrency: true },
];

function formatValue(value, isCurrency) {
  if (value === undefined || value === null) return "—";
  if (isCurrency) {
    const n = Number(value);
    return Number.isNaN(n) ? value : `£${n.toLocaleString()}`;
  }
  return Number(value).toLocaleString?.() ?? value;
}

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await api.dashboard.summary();
        if (active) setSummary(data || {});
      } catch (err) {
        if (active) setError(err.message || "Couldn't load the summary.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h2>Dashboard</h2>
          <p className="page__description">
            A snapshot of MZ Essence right now.
          </p>
        </div>
      </div>

      {error && <div className="alert alert--error">{error}</div>}

      <div className="summary-grid">
        {CARD_DEFS.map((card) => (
          <div className="summary-card" key={card.key}>
            <div className="summary-card__icon">{card.icon}</div>
            <div className="summary-card__body">
              <span className="summary-card__label">{card.label}</span>
              <strong className="summary-card__value">
                {loading
                  ? "…"
                  : formatValue(summary?.[card.key], card.isCurrency)}
              </strong>
            </div>
          </div>
        ))}
      </div>

      <div className="page__card dashboard-note">
        <h3>Recent activity</h3>
        <p>
          Detailed activity feeds will appear here once the backend exposes
          a recent-activity endpoint. For now, head to{" "}
          <strong>Orders</strong> or <strong>Promotions</strong> from the
          sidebar to review the latest changes.
        </p>
      </div>
    </div>
  );
}
