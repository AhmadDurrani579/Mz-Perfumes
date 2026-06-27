// src/pages/Promotions.jsx
import { useEffect, useState } from "react";
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "title", label: "Promotion" },
  { key: "promotion_scope", label: "Scope" },
  { key: "discount_type", label: "Discount Type" },
  {
    key: "discount_value",
    label: "Discount",
    render: (r) =>
      r.discount_type === "percentage"
        ? `${r.discount_value}%`
        : `PKR ${r.discount_value ?? 0}`,
  },
  { key: "start_date", label: "Start" },
  { key: "end_date", label: "End" },
  {
    key: "is_active",
    label: "Status",
    render: (r) => (r.is_active ? "Active" : "Inactive"),
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
        if (live) setActive(Array.isArray(data) ? data : []);
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
              {promo.title} · {promo.promotion_scope} ·{" "}
              {promo.discount_type === "percentage"
                ? `${promo.discount_value}%`
                : `PKR ${promo.discount_value}`}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Promotions() {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.brands.list().then((data) => setBrands(data || [])).catch(console.error);
    api.products.list().then((data) => setProducts(data || [])).catch(console.error);
  }, []);

  const fields = [
    { name: "title", label: "Promotion Title", required: true },

    { name: "description", label: "Description", type: "textarea" },

    {
      name: "discount_type",
      label: "Discount Type",
      type: "select",
      options: ["percentage", "fixed"],
      default: "percentage",
      required: true,
    },

    {
      name: "discount_value",
      label: "Discount Value",
      type: "number",
      required: true,
    },

    {
      name: "promotion_scope",
      label: "Promotion Scope",
      type: "select",
      options: ["all_products", "brand", "product"],
      default: "all_products",
      required: true,
    },

    {
      name: "brand_id",
      label: "Brand",
      type: "select",
      options: [
        { label: "None", value: "" },
        ...brands.map((brand) => ({
          label: brand.name,
          value: brand.id,
        })),
      ],
    },

    {
      name: "product_id",
      label: "Product",
      type: "select",
      options: [
        { label: "None", value: "" },
        ...products.map((product) => ({
          label: product.name,
          value: product.id,
        })),
      ],
    },

    { name: "banner_image_url", label: "Banner Image URL" },

    { name: "start_date", label: "Start Date", type: "datetime-local" },

    { name: "end_date", label: "End Date", type: "datetime-local" },

    {
      name: "apply_to_all",
      label: "Apply To All",
      type: "checkbox",
      default: true,
    },

    {
      name: "is_active",
      label: "Active",
      type: "checkbox",
      default: false,
    },
  ];

  return (
    <>
      <ActivePromotionsStrip />

      <CrudPage
        title="Promotions"
        description="Discounts and limited-time offers."
        resourceApi={api.promotions}
        columns={columns}
        fields={fields}
        searchKeys={["title", "promotion_scope", "discount_type"]}
        searchPlaceholder="Search promotions…"
        DataTable={DataTable}
        ModalForm={ModalForm}
        emptyLabel="No promotions yet."
      />
    </>
  );
}