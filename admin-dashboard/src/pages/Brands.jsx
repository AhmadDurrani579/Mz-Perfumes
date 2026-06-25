// src/pages/Brands.jsx
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "name", label: "Brand" },
  { key: "country", label: "Country" },
  { key: "status", label: "Status", type: "status" },
];

const fields = [
  { name: "name", label: "Brand name", required: true },
  { name: "country", label: "Country of origin" },
  { name: "logo_url", label: "Logo URL" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["active", "inactive"],
    default: "active",
  },
  { name: "description", label: "About this brand", type: "textarea" },
];

export default function Brands() {
  return (
    <CrudPage
      title="Brands"
      description="House brands featured across MZ Essence."
      resourceApi={api.brands}
      columns={columns}
      fields={fields}
      searchKeys={["name", "country"]}
      searchPlaceholder="Search brands…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No brands yet."
    />
  );
}
