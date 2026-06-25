// src/pages/Products.jsx
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "name", label: "Product" },
  { key: "sku", label: "SKU" },
  { key: "brand", label: "Brand" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price", render: (r) => `£${r.price ?? "0.00"}` },
  { key: "stock", label: "Stock" },
  { key: "status", label: "Status", type: "status" },
];

const fields = [
  { name: "name", label: "Product name", required: true },
  { name: "sku", label: "SKU", required: true },
  { name: "brand", label: "Brand" },
  { name: "category", label: "Category" },
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
  { name: "description", label: "Description", type: "textarea" },
];

export default function Products() {
  return (
    <CrudPage
      title="Products"
      description="The full perfume and fragrance catalogue."
      resourceApi={api.products}
      columns={columns}
      fields={fields}
      searchKeys={["name", "sku", "brand", "category"]}
      searchPlaceholder="Search products…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No products yet. Add your first fragrance."
    />
  );
}
