// src/pages/PartnerBrands.jsx
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "partner_code", label: "Code" },
  { key: "brand_name", label: "Brand Name" },
  { key: "contact_person", label: "Contact Person" },
  { key: "phone_number", label: "Phone" },
  { key: "email", label: "Email" },
  {
    key: "commission_percentage",
    label: "Commission",
    render: (r) => `${r.commission_percentage}%`,
  },
  { key: "status", label: "Status", type: "status" },
  {
    key: "is_active",
    label: "Active",
    render: (r) => (r.is_active ? "Yes" : "No"),
  },
];

const fields = [
  {
    name: "brand_name",
    label: "Brand Name",
    required: true,
  },

  {
    name: "contact_person",
    label: "Contact Person",
    required: true,
  },

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
    name: "website_url",
    label: "Website URL",
  },

  {
    name: "logo_url",
    label: "Logo URL",
  },

  {
    name: "commission_percentage",
    label: "Commission Percentage",
    type: "number",
    required: true,
  },

  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["pending", "approved", "rejected"],
    default: "pending",
  },

  {
    name: "notes",
    label: "Notes",
    type: "textarea",
  },

  {
    name: "is_active",
    label: "Active",
    type: "checkbox",
    default: true,
  },
];

export default function PartnerBrands() {
  return (
    <CrudPage
      title="Partner Brands"
      description="Third-party brands distributed through MZ Essence."
      resourceApi={api.partnerBrands}
      columns={columns}
      fields={fields}
      searchKeys={[
        "partner_code",
        "brand_name",
        "contact_person",
        "email",
      ]}
      searchPlaceholder="Search partner brands…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No partner brands yet."
    />
  );
}
