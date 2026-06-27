// src/pages/Affiliates.jsx
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "affiliate_code", label: "Code" },
  { key: "full_name", label: "Full Name" },
  { key: "email", label: "Email" },
  { key: "phone_number", label: "Phone" },
  { key: "city", label: "City" },
  { key: "status", label: "Status", type: "status" },
  {
    key: "is_active",
    label: "Active",
    render: (r) => (r.is_active ? "Yes" : "No"),
  },
];

const fields = [
  { name: "full_name", label: "Full Name", required: true },

  {
    name: "phone_number",
    label: "Phone Number",
    required: true,
  },

  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },

  {
    name: "instagram_username",
    label: "Instagram Username",
  },

  {
    name: "tiktok_username",
    label: "TikTok Username",
  },

  { name: "city", label: "City" },

  {
    name: "reason",
    label: "Reason",
    type: "textarea",
  },

  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["pending", "approved", "rejected"],
    default: "pending",
  },

  {
    name: "is_active",
    label: "Active",
    type: "checkbox",
    default: true,
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
      searchKeys={[
        "affiliate_code",
        "full_name",
        "email",
        "city",
      ]}
      searchPlaceholder="Search affiliates…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No affiliates yet."
    />
  );
}
