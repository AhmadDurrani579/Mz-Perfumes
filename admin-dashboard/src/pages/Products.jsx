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
    product_id: row.id,
    variant_size_id: v.variant_size_id,
    price: v.price,
    stock_quantity: v.stock_quantity,
  }));

  return { variants };
}

// Runs after the product itself is saved. Reconciles the checked sizes
// against what's actually stored: creates newly-checked sizes, updates
// previously-checked ones, deletes unchecked ones.
async function afterSave(savedProduct, values) {
  const submitted = values.variants || [];
  const existing = await api.productVariants.listByProduct(savedProduct.id);

  const submittedSizeIds = new Set(
    submitted.map((v) => String(v.variant_size_id))
  );

  await Promise.all(
    existing
      .filter((v) => !submittedSizeIds.has(String(v.variant_size_id)))
      .map((v) => api.productVariants.remove(savedProduct.id, v.variant_size_id))
  );

  await Promise.all(
    submitted.map((v) => {
      const payload = {
        product_id: savedProduct.id,
        variant_size_id: v.variant_size_id,
        price: v.price,
        stock_quantity: Number(v.stock_quantity || 0),
        is_active: true,
      };

      const alreadyExists = existing.some(
        (x) => String(x.variant_size_id) === String(v.variant_size_id)
      );

      return alreadyExists
        ? api.productVariants.update(savedProduct.id, v.variant_size_id, payload)
        : api.productVariants.create(payload);
    })
  );

  const images = values.images || [];

  if (images.length > 0) {
    await Promise.all(
      images.map((url, index) =>
        api.productImages.create({
          product_id: savedProduct.id,
          image_url: url,
          sort_order: index + 1,
          is_primary: index === 0,
        })
      )
    );
  }
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
      name: "images",
      label: "Product Images",
      type: "multi_file",
      upload: api.uploads.image,
      maxFiles: 4,
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