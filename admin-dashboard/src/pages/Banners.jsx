// src/pages/Banners.jsx
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "title", label: "Title" },
  { key: "subtitle", label: "Subtitle" },
  { key: "redirect_url", label: "Redirect URL" },
  { key: "start_date", label: "Start Date" },
  { key: "end_date", label: "End Date" },
  {
    key: "is_active",
    label: "Status",
    render: (r) => (r.is_active ? "Active" : "Inactive"),
  },
];

const fields = [
  { name: "title", label: "Banner Title", required: true },
  { name: "subtitle", label: "Subtitle" },
  { name: "image_url", label: "Image URL", required: true },
  { name: "redirect_url", label: "Redirect URL" },

  {
    name: "start_date",
    label: "Start Date",
    type: "datetime-local",
  },
  {
    name: "end_date",
    label: "End Date",
    type: "datetime-local",
  },

  {
    name: "is_active",
    label: "Active",
    type: "checkbox",
    default: false,
  },
];

export default function Banners() {
  return (
    <CrudPage
      title="Banners"
      description="Hero and promotional banners across the storefront."
      resourceApi={api.banners}
      columns={columns}
      fields={fields}
      searchKeys={["title", "position"]}
      searchPlaceholder="Search banners…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No banners yet."
    />
  );
}
