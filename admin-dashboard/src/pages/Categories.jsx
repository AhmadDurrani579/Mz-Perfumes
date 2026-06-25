// src/pages/Categories.jsx
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "name", label: "Category" },
  { key: "slug", label: "Slug" },
  { key: "status", label: "Status", type: "status" },
];

const fields = [
  { name: "name", label: "Category name", required: true },
  { name: "slug", label: "Slug" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["active", "inactive"],
    default: "active",
  },
  { name: "description", label: "Description", type: "textarea" },
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
