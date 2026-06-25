// src/pages/PartnerBrands.jsx
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "name", label: "Partner brand" },
  { key: "contact_email", label: "Contact" },
  { key: "status", label: "Status", type: "status" },
];

const fields = [
  { name: "name", label: "Partner brand name", required: true },
  { name: "contact_email", label: "Contact email", type: "email" },
  { name: "logo_url", label: "Logo URL" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["active", "inactive"],
    default: "active",
  },
  { name: "description", label: "Partnership notes", type: "textarea" },
];

export default function PartnerBrands() {
  return (
    <CrudPage
      title="Partner Brands"
      description="Third-party brands distributed through MZ Essence."
      resourceApi={api.partnerBrands}
      columns={columns}
      fields={fields}
      searchKeys={["name", "contact_email"]}
      searchPlaceholder="Search partner brands…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No partner brands yet."
    />
  );
}
