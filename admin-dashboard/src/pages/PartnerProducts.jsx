// src/pages/PartnerProducts.jsx
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "name", label: "Product" },
  { key: "partner_brand", label: "Partner brand" },
  { key: "price", label: "Price", render: (r) => `£${r.price ?? "0.00"}` },
  { key: "stock", label: "Stock" },
  { key: "status", label: "Status", type: "status" },
];

const fields = [
  { name: "name", label: "Product name", required: true },
  { name: "partner_brand", label: "Partner brand", required: true },
  { name: "price", label: "Price", type: "number", required: true },
  { name: "stock", label: "Stock quantity", type: "number" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["active", "inactive"],
    default: "active",
  },
  { name: "image_url", label: "Image URL" },
];

export default function PartnerProducts() {
  return (
    <CrudPage
      title="Partner Products"
      description="Products supplied by partner brands."
      resourceApi={api.partnerProducts}
      columns={columns}
      fields={fields}
      searchKeys={["name", "partner_brand"]}
      searchPlaceholder="Search partner products…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No partner products yet."
    />
  );
}
