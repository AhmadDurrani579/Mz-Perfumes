// src/pages/Branches.jsx
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "name", label: "Branch" },
  { key: "city", label: "City" },
  { key: "phone", label: "Phone" },
  { key: "status", label: "Status", type: "status" },
];

const fields = [
  { name: "name", label: "Branch name", required: true },
  { name: "address", label: "Address", required: true },
  { name: "city", label: "City", required: true },
  { name: "phone", label: "Phone" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["active", "inactive"],
    default: "active",
  },
];

export default function Branches() {
  return (
    <CrudPage
      title="Branches"
      description="Physical boutiques and counters."
      resourceApi={api.branches}
      columns={columns}
      fields={fields}
      searchKeys={["name", "city", "phone"]}
      searchPlaceholder="Search branches…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No branches yet."
    />
  );
}
