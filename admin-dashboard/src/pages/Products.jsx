// src/pages/Products.jsx
import { useEffect, useState } from "react";
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "name", label: "Product" },
  { key: "slug", label: "Slug" },
  { key: "gender", label: "Gender" },
  { key: "product_type", label: "Type" },
  {
    key: "is_active",
    label: "Status",
    render: (r) => (r.is_active ? "Active" : "Inactive"),
  },
];

// Pulls in this product's existing size selections so the checklist
// is pre-checked (with its saved stock) when you click Edit.
async function loadExtra(row) {
  const existingVariants = await api.productVariants.listByProduct(row.id);
  const variants = existingVariants.map((v) => ({
    variant_size_id: v.variant_size_id,
    price: v.price,
    stock_quantity: v.stock_quantity,
    _existingVariantId: v.id,
  }));
  return { variants };
}

// Runs after the product itself is saved. Reconciles the checked sizes
// against what's actually stored: creates newly-checked sizes, updates
// previously-checked ones, deletes unchecked ones.
async function afterSave(savedProduct, values) {
  const submitted = values.variants || [];

  const existing = await api.productVariants.listByProduct(savedProduct.id);
  const existingIds = new Set(existing.map((v) => String(v.id)));
  const submittedIds = new Set(
    submitted
      .filter((v) => v._existingVariantId)
      .map((v) => String(v._existingVariantId))
  );

  // Remove sizes that were unchecked.
  await Promise.all(
    existing
      .filter((v) => !submittedIds.has(String(v.id)))
      .map((v) => api.productVariants.remove(v.id))
  );

  // Create newly-checked sizes, update previously-checked ones.
  await Promise.all(
    submitted.map((v) => {
       const payload = {
          product_id: savedProduct.id,
          variant_size_id: v.variant_size_id,
          price: v.price,
          stock_quantity: v.stock_quantity,
        };     
       return v._existingVariantId && existingIds.has(String(v._existingVariantId))
        ? api.productVariants.update(v._existingVariantId, payload)
        : api.productVariants.create(payload);
    })
  );
}

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    api.categories.list().then((data) => setCategories(data || [])).catch(console.error);
    api.brands.list().then((data) => setBrands(data || [])).catch(console.error);
    api.branches.list().then((data) => setBranches(data || [])).catch(console.error);
    api.sizes.list().then((data) => setSizes(data || [])).catch(console.error);
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
    {
      name: "variants",
      label: "Available Sizes",
      type: "size_picker",
      sizeOptions: sizes,
    }, 
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
      loadExtra={loadExtra}
      afterSave={afterSave}
      extraFieldKeys={["variants"]}
    />
  );
}