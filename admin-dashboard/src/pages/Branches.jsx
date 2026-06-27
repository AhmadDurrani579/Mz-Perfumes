// src/pages/Branches.jsx
import { useEffect, useState } from "react";
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "name", label: "Branch" },
  { key: "slug", label: "Slug" },
  { key: "city", label: "City" },
  { key: "province", label: "Province" },
  { key: "phone_number", label: "Phone" },
  {
    key: "is_active",
    label: "Status",
    render: (r) => (r.is_active ? "Active" : "Inactive"),
  },
];

export default function Branches() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    api.brands.list()
      .then((data) => setBrands(data || []))
      .catch((err) => console.error("Failed to load brands:", err));
  }, []);

  const fields = [
    {
      name: "brand_id",
      label: "Brand",
      type: "select",
      options: brands.map((brand) => ({
        label: brand.name,
        value: brand.id,
      })),
      required: true,
    },
    { name: "name", label: "Branch name", required: true },
    { name: "slug", label: "Slug", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "address", label: "Address", required: true },
    { name: "city", label: "City", required: true },
    { name: "province", label: "Province" },
    { name: "phone_number", label: "Phone Number" },
    { name: "whatsapp_number", label: "WhatsApp Number" },
    { name: "email", label: "Email", type: "email" },
    { name: "is_active", label: "Active", type: "checkbox", default: false },
  ];

  return (
    <CrudPage
      title="Branches"
      description="Physical boutiques and counters."
      resourceApi={api.branches}
      columns={columns}
      fields={fields}
      searchKeys={["name", "slug", "city", "province", "phone_number"]}
      searchPlaceholder="Search branches…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No branches yet."
    />
  );
}