// src/pages/PartnerProducts.jsx
import { useEffect, useState } from "react";
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "product_code", label: "Code" },
  { key: "name", label: "Product" },
  { key: "actual_price", label: "Actual Price", render: (r) => `PKR ${r.actual_price ?? 0}` },
  { key: "discount_price", label: "Discount Price", render: (r) => `PKR ${r.discount_price ?? 0}` },
  { key: "size", label: "Size" },
  { key: "is_featured", label: "Featured", render: (r) => (r.is_featured ? "Yes" : "No") },
  { key: "is_active", label: "Status", render: (r) => (r.is_active ? "Active" : "Inactive") },
];

export default function PartnerProducts() {
  const [partnerBrands, setPartnerBrands] = useState([]);

  useEffect(() => {
    api.partnerBrands
      .list()
      .then((data) => {
        console.log("Partner brands:", data);
        setPartnerBrands(data || []);
      })
      .catch(console.error);
  }, []);
  const fields = [
    {
      name: "partner_brand_id",
      label: "Partner Brand",
      type: "select",
      required: true,
      options: partnerBrands.map((brand) => ({
        label: `${brand.brand_name} (${brand.partner_code})`,
        value: brand.id,
      })),
    },
    { name: "name", label: "Product Name", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "actual_price", label: "Actual Price", type: "number" },
    { name: "discount_price", label: "Discount Price", type: "number" },
    { name: "size", label: "Size" },
    {
      name: "main_image_url",
      label: "Product Image",
      type: "file",
      upload: api.uploads.image,
    },
    { name: "is_featured", label: "Featured", type: "checkbox", default: false },
    { name: "is_active", label: "Active", type: "checkbox", default: true },
  ];

  return (
    <CrudPage
      title="Partner Products"
      description="Products supplied by partner brands."
      resourceApi={api.partnerProducts}
      columns={columns}
      fields={fields}
      searchKeys={["name", "product_code", "size"]}
      searchPlaceholder="Search partner products…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No partner products yet."
    />
  );
}