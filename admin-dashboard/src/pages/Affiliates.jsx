// src/pages/Affiliates.jsx
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "name", label: "Affiliate" },
  { key: "email", label: "Email" },
  { key: "code", label: "Referral code" },
  {
    key: "commission_rate",
    label: "Commission",
    render: (r) => (r.commission_rate ? `${r.commission_rate}%` : "—"),
  },
  { key: "status", label: "Status", type: "status" },
];

const fields = [
  { name: "name", label: "Full name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "code", label: "Referral code", required: true },
  { name: "commission_rate", label: "Commission %", type: "number" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["active", "pending", "inactive"],
    default: "pending",
  },
];

export default function Affiliates() {
  return (
    <CrudPage
      title="Affiliates"
      description="Partners earning commission on referred sales."
      resourceApi={api.affiliates}
      columns={columns}
      fields={fields}
      searchKeys={["name", "email", "code"]}
      searchPlaceholder="Search affiliates…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No affiliates yet."
    />
  );
}
