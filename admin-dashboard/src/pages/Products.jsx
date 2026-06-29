// src/pages/Products.jsx
import { useEffect, useState } from "react";
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

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    api.categories.list().then((data) => setCategories(data || [])).catch(console.error);
    api.brands.list().then((data) => setBrands(data || [])).catch(console.error);
    api.branches.list().then((data) => setBranches(data || [])).catch(console.error);
  }, []);

  const fields = [
    {
      name: "category_id",
      label: "Category",
      type: "select",
      options: categories.map((c) => ({ label: c.name, value: c.id })),
      required: true,
    },
    {
      name: "brand_id",
      label: "Brand",
      type: "select",
      options: brands.map((b) => ({ label: b.name, value: b.id })),
      required: true,
    },
    {
      name: "branch_id",
      label: "Branch",
      type: "select",
      options: branches.map((b) => ({ label: b.name, value: b.id })),
    },
    { name: "name", label: "Product Name", required: true },
    { name: "slug", label: "Slug", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "actual_price", label: "Actual Price", type: "number", required: true },
    { name: "discount_price", label: "Discount Price", type: "number" },
    { name: "stock_quantity", label: "Stock", type: "number" },
    { name: "size", label: "Size" },
    { name: "gender", label: "Gender" },
    { name: "product_type", label: "Product Type" },
    {
      name: "main_image_url",
      label: "Product Image",
      type: "file",
      upload: api.uploads.image,
    },
    { name: "is_featured", label: "Featured", type: "checkbox" },
    { name: "is_active", label: "Active", type: "checkbox", default: true },
  ];

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