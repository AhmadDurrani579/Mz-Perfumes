// src/pages/Orders.jsx
import CrudPage from "./CrudPage";
import DataTable from "../components/DataTable";
import ModalForm from "../components/ModalForm";
import { api } from "../api/api";

const columns = [
  { key: "order_number", label: "Order #" },
  { key: "customer_name", label: "Customer" },
  { key: "total", label: "Total", render: (r) => `£${r.total ?? "0.00"}` },
  { key: "payment_status", label: "Payment", type: "status" },
  { key: "status", label: "Status", type: "status" },
];

const fields = [
  { name: "order_number", label: "Order number", required: true },
  { name: "customer_name", label: "Customer name", required: true },
  { name: "customer_email", label: "Customer email", type: "email" },
  { name: "total", label: "Order total", type: "number", required: true },
  {
    name: "payment_status",
    label: "Payment status",
    type: "select",
    options: ["paid", "pending", "refunded", "failed"],
    default: "pending",
  },
  {
    name: "status",
    label: "Order status",
    type: "select",
    options: ["pending", "processing", "completed", "cancelled"],
    default: "pending",
  },
];

export default function Orders() {
  return (
    <CrudPage
      title="Orders"
      description="Customer orders placed across all channels."
      resourceApi={api.orders}
      columns={columns}
      fields={fields}
      searchKeys={["order_number", "customer_name"]}
      searchPlaceholder="Search orders…"
      DataTable={DataTable}
      ModalForm={ModalForm}
      emptyLabel="No orders yet."
    />
  );
}
