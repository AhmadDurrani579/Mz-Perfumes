// src/pages/Orders.jsx
import { useEffect, useState } from "react";
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "customer_name", label: "Customer" },
  { key: "customer_phone", label: "Phone" },
  { key: "quantity", label: "Qty" },
  { key: "size", label: "Size" },
  {
    key: "total_amount",
    label: "Total",
    render: (r) => `PKR ${r.total_amount ?? 0}`,
  },
  { key: "payment_status", label: "Payment", type: "status" },
  { key: "delivery_status", label: "Delivery", type: "status" },
  { key: "city", label: "City" },
];

export default function Orders() {
  const [products, setProducts] = useState([]);
  const [affiliates, setAffiliates] = useState([]);

  useEffect(() => {
    api.products
      .list()
      .then((data) => setProducts(data || []))
      .catch(console.error);

    api.affiliates
      .list()
      .then((data) => setAffiliates(data || []))
      .catch(console.error);
  }, []);

  const fields = [
    { name: "customer_name", label: "Customer Name", required: true },
    { name: "customer_phone", label: "Customer Phone", required: true },
    { name: "customer_email", label: "Customer Email", type: "email" },

    {
      name: "product_id",
      label: "Product",
      type: "select",
      required: true,
      options: products.map((product) => ({
        label: product.name,
        value: product.id,
      })),
    },

    {
      name: "affiliate_id",
      label: "Affiliate",
      type: "select",
      options: [
        { label: "None", value: "" },
        ...affiliates.map((affiliate) => ({
          label: `${affiliate.full_name} (${affiliate.affiliate_code})`,
          value: affiliate.id,
        })),
      ],
    },

    { name: "quantity", label: "Quantity", type: "number", required: true },
    { name: "size", label: "Size" },
    { name: "total_amount", label: "Total Amount", type: "number", required: true },

    {
      name: "payment_status",
      label: "Payment Status",
      type: "select",
      options: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    {
      name: "delivery_status",
      label: "Delivery Status",
      type: "select",
      options: ["new", "processing", "shipped", "delivered", "cancelled"],
      default: "new",
    },

    { name: "address", label: "Address" },
    { name: "city", label: "City" },
    { name: "notes", label: "Notes", type: "textarea" },
  ];

  return (
    <CrudPage
      title="Orders"
      description="Customer orders placed across all channels."
      resourceApi={api.orders}
      columns={columns}
      fields={fields}
      searchKeys={["customer_name", "customer_phone", "city"]}
      searchPlaceholder="Search orders…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No orders yet."
    />
  );
}