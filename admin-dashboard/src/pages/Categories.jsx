// src/pages/Categories.jsx
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "name", label: "Category" },
  { key: "slug", label: "Slug" },
  { key: "description", label: "Description" },
  {
    key: "is_active",
    label: "Status",
    render: (r) => (r.is_active ? "Active" : "Inactive"),
  },
];

const fields = [
  { name: "name", label: "Category name", required: true },
  { name: "slug", label: "Slug", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "is_active", label: "Active", type: "checkbox" },
];

export default function Categories() {
  return (
    <CrudPage
      title="Categories"
      description="Organise products into fragrance categories."
      resourceApi={api.categories}
      columns={columns}
      fields={fields}
      searchKeys={["name", "slug"]}
      searchPlaceholder="Search categories…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No categories yet."
    />
  );
}
