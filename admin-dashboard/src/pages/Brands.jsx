// src/pages/Brands.jsx
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "name", label: "Brand" },
  { key: "slug", label: "Slug" },
  { key: "description", label: "Description" },
  {
    key: "is_active",
    label: "Status",
    render: (r) => (r.is_active ? "Active" : "Inactive"),
  },
];

const fields = [
  { name: "name", label: "Brand name", required: true },
  { name: "slug", label: "Slug", required: true },
  { name: "logo_url", label: "Logo URL" },
  { name: "description", label: "About this brand", type: "textarea" },
  {
    name: "is_active",
    label: "Active",
    type: "checkbox",
    default: false,
  },
];

export default function Brands() {
  return (
    <CrudPage
      title="Brands"
      description="House brands featured across MZ Essence."
      resourceApi={api.brands}
      columns={columns}
      fields={fields}
      searchKeys={["name", "slug", "description"]}
      searchPlaceholder="Search brands…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No brands yet."
    />
  );
}