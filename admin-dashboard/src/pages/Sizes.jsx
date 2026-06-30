// src/pages/Sizes.jsx
//
// This is now the single source of truth for both a size's NAME and
// its PRICE — e.g. "30ml" costs whatever you set here, for every
// product that offers it. Change the price here once, and every
// product using that size shows the new price immediately — nothing to
// update per product. (File kept as Sizes.jsx so nothing else needs to
// change its import path; the page itself is labelled "Variants".)
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "label", label: "Size" },
  { key: "size_ml", label: "ML" },
  { key: "price", label: "Price", render: (r) => `PKR ${r.price ?? 0}` },
  {
    key: "is_active",
    label: "Status",
    render: (r) => (r.is_active ? "Active" : "Inactive"),
  },
];

const fields = [
  { name: "label", label: "Size Label", required: true },
  { name: "size_ml", label: "Size ML", type: "number" },
  { name: "price", label: "Price", type: "number", required: true },
  { name: "is_active", label: "Active", type: "checkbox", default: true },
];
export default function Sizes() {
  return (
    <CrudPage
      title="Variants"
      description="Every size and its price, in one place. Change a price here and it updates on every product that offers this size — nothing to edit per product."
      resourceApi={api.sizes}
      columns={columns}
      fields={fields}
      searchKeys={["label"]}
      searchPlaceholder="Search sizes…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No sizes yet — add your first one, e.g. 30ml with its price."
    />
  );
}
