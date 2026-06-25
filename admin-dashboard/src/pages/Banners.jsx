// src/pages/Banners.jsx
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "title", label: "Banner" },
  { key: "position", label: "Position" },
  { key: "link_url", label: "Link" },
  { key: "status", label: "Status", type: "status" },
];

const fields = [
  { name: "title", label: "Title", required: true },
  { name: "image_url", label: "Image URL", required: true },
  { name: "link_url", label: "Link URL" },
  {
    name: "position",
    label: "Position",
    type: "select",
    options: ["home_hero", "home_secondary", "category_top", "checkout"],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["active", "inactive"],
    default: "active",
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
