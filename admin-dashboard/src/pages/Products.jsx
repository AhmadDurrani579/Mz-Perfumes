// src/pages/Products.jsx
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "name", label: "Product" },
  { key: "slug", label: "Slug" },
  { key: "actual_price", label: "Actual Price", render: (r) => `PKR ${r.actual_price ?? 0}` },
  { key: "discount_price", label: "Discount Price", render: (r) => `PKR ${r.discount_price ?? 0}` },
  { key: "stock_quantity", label: "Stock" },
  { key: "size", label: "Size" },
  { key: "gender", label: "Gender" },
  { key: "product_type", label: "Type" },
  { key: "is_active", label: "Status", render: (r) => (r.is_active ? "Active" : "Inactive") },
];

const fields = [
  { name: "name", label: "Product name", required: true },
  { name: "slug", label: "Slug", required: true },

  { name: "actual_price", label: "Actual Price", type: "number", required: true },
  { name: "discount_price", label: "Discount Price", type: "number" },
  { name: "stock_quantity", label: "Stock Quantity", type: "number" },

  { name: "size", label: "Size" },
  { name: "gender", label: "Gender" },
  { name: "product_type", label: "Product Type" },

  { name: "main_image_url", label: "Image URL" },
  { name: "description", label: "Description", type: "textarea" },

  { name: "is_active", label: "Active", type: "checkbox" },
  { name: "is_featured", label: "Featured", type: "checkbox" },
];

export default function Products() {
  return (
    <CrudPage
      title="Products"
      description="The full perfume and fragrance catalogue."
      resourceApi={api.products}
      columns={columns}
      fields={fields}
      searchKeys={["name", "slug", "gender", "product_type", "size"]}
      searchPlaceholder="Search products…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No products yet. Add your first fragrance."
    />
  );
}
