// src/api/mockData.js
//
// Everything the dashboard needs to run fully offline, before the real
// backend exists. When demo mode is on (see api.js / isDemoMode), every
// resource reads/writes here instead of calling fetch().
//
// Data is seeded into localStorage on first use so edits/adds/deletes
// persist across refreshes, just like a real backend would. Call
// resetDemoData() to wipe it back to the original seed.

const STORAGE_PREFIX = "mz_demo_";

const SEED = {
  products: [
    { id: 1, name: "Velvet Oud", sku: "MZ-001", brand: "MZ Essence", category: "Oriental", price: "85.00", stock: 42, status: "active", image_url: "", description: "A warm, resinous oud softened with vanilla and amber." },
    { id: 2, name: "Rose Noir", sku: "MZ-002", brand: "MZ Essence", category: "Floral", price: "72.50", stock: 18, status: "active", image_url: "", description: "Dark rose petals layered over smoked patchouli." },
    { id: 3, name: "Citrus Aura", sku: "MZ-003", brand: "Maison Belle", category: "Citrus", price: "64.00", stock: 0, status: "inactive", image_url: "", description: "Bright bergamot and neroli, discontinued for restock." },
    { id: 4, name: "Amber Mist", sku: "MZ-004", brand: "MZ Essence", category: "Woody", price: "98.00", stock: 27, status: "active", image_url: "", description: "Sandalwood and amber with a soft musk base." },
    { id: 5, name: "Jasmine Veil", sku: "MZ-005", brand: "Maison Belle", category: "Floral", price: "76.25", stock: 9, status: "active", image_url: "", description: "Jasmine sambac wrapped in white musk." },
  ],
  categories: [
    { id: 1, name: "Oriental", slug: "oriental", status: "active", description: "Warm, spiced, resinous fragrances." },
    { id: 2, name: "Floral", slug: "floral", status: "active", description: "Rose, jasmine, and other florals." },
    { id: 3, name: "Citrus", slug: "citrus", status: "active", description: "Bright, zesty top notes." },
    { id: 4, name: "Woody", slug: "woody", status: "inactive", description: "Sandalwood, cedar, vetiver." },
  ],
  brands: [
    { id: 1, name: "MZ Essence", country: "United Kingdom", logo_url: "", status: "active", description: "The house line." },
    { id: 2, name: "Maison Belle", country: "France", logo_url: "", status: "active", description: "Partnered French perfumery." },
    { id: 3, name: "Noor Atelier", country: "UAE", logo_url: "", status: "inactive", description: "Middle Eastern oud specialists." },
  ],
  branches: [
    { id: 1, name: "Reading Boutique", address: "12 Broad Street", city: "Reading", phone: "0118 555 0142", status: "active" },
    { id: 2, name: "London Mayfair", address: "5 Mount Street", city: "London", phone: "020 7946 0123", status: "active" },
    { id: 3, name: "Manchester Counter", address: "8 King Street", city: "Manchester", phone: "0161 555 0199", status: "inactive" },
  ],
  banners: [
    { id: 1, title: "Summer Collection", image_url: "", link_url: "/collections/summer", position: "home_hero", status: "active" },
    { id: 2, title: "Refer a Friend", image_url: "", link_url: "/affiliates", position: "home_secondary", status: "active" },
    { id: 3, title: "Winter Sale", image_url: "", link_url: "/sale", position: "checkout", status: "inactive" },
  ],
  promotions: [
    { id: 1, title: "Welcome Offer", code: "WELCOME10", discount_percent: "10", start_date: "2026-01-01", end_date: "2026-12-31", status: "active" },
    { id: 2, title: "Summer Sale", code: "SUMMER15", discount_percent: "15", start_date: "2026-06-01", end_date: "2026-07-31", status: "active" },
    { id: 3, title: "Black Friday", code: "BF2025", discount_percent: "25", start_date: "2025-11-20", end_date: "2025-11-30", status: "expired" },
  ],
  affiliates: [
    { id: 1, name: "Sara Ahmed", email: "sara@example.com", code: "SARA10", commission_rate: "8", status: "active" },
    { id: 2, name: "Tom Whitfield", email: "tom@example.com", code: "TOMW", commission_rate: "5", status: "pending" },
    { id: 3, name: "Layla Hassan", email: "layla@example.com", code: "LAYLA20", commission_rate: "10", status: "active" },
  ],
  orders: [
    { id: 1, order_number: "#10234", customer_name: "Sarah Khan", customer_email: "sarah@example.com", total: "142.00", payment_status: "paid", status: "completed" },
    { id: 2, order_number: "#10235", customer_name: "James Wood", customer_email: "james@example.com", total: "64.00", payment_status: "pending", status: "processing" },
    { id: 3, order_number: "#10236", customer_name: "Amal Hussein", customer_email: "amal@example.com", total: "210.50", payment_status: "paid", status: "pending" },
    { id: 4, order_number: "#10237", customer_name: "Leila Moreau", customer_email: "leila@example.com", total: "38.00", payment_status: "failed", status: "cancelled" },
  ],
  partnerBrands: [
    { id: 1, name: "Noor Atelier", contact_email: "partners@nooratelier.com", logo_url: "", status: "active", description: "Oud-focused partner brand." },
    { id: 2, name: "Lumière Paris", contact_email: "hello@lumiere.fr", logo_url: "", status: "active", description: "French niche perfumery." },
  ],
  partnerProducts: [
    { id: 1, name: "Desert Rose", partner_brand: "Noor Atelier", price: "120.00", stock: 14, status: "active", image_url: "" },
    { id: 2, name: "Lumière Blanche", partner_brand: "Lumière Paris", price: "98.00", stock: 6, status: "active", image_url: "" },
  ],
};

function readSeed(key) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw) return JSON.parse(raw);
  } catch {
    /* fall through to reseed */
  }
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(SEED[key]));
  return SEED[key].map((row) => ({ ...row }));
}

function persist(key) {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(db[key]));
}

function delay(ms = 280) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Module-level store, one array per resource. Lazily seeded from
// localStorage (or SEED) the first time each key is touched.
const db = {};
Object.keys(SEED).forEach((key) => {
  db[key] = readSeed(key);
});

export function resetDemoData() {
  Object.keys(SEED).forEach((key) => {
    db[key] = SEED[key].map((row) => ({ ...row }));
    persist(key);
  });
}

export function createMockResource(key) {
  return {
    async list() {
      await delay();
      return db[key];
    },
    async get(id) {
      await delay();
      const row = db[key].find((r) => String(r.id) === String(id));
      if (!row) throw new Error("Record not found.");
      return row;
    },
    async create(payload) {
      await delay();
      const ids = db[key].map((r) => Number(r.id) || 0);
      const newId = (ids.length ? Math.max(...ids) : 0) + 1;
      const row = { id: newId, ...payload };
      db[key] = [row, ...db[key]];
      persist(key);
      return row;
    },
    async update(id, payload) {
      await delay();
      db[key] = db[key].map((r) =>
        String(r.id) === String(id) ? { ...r, ...payload, id: r.id } : r
      );
      persist(key);
      return db[key].find((r) => String(r.id) === String(id));
    },
    async remove(id) {
      await delay();
      db[key] = db[key].filter((r) => String(r.id) !== String(id));
      persist(key);
      return null;
    },
  };
}

export async function mockDashboardSummary() {
  await delay();
  const revenue = db.orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  return {
    total_products: db.products.length,
    total_orders: db.orders.length,
    pending_orders: db.orders.filter((o) => o.status === "pending").length,
    total_affiliates: db.affiliates.length,
    total_brands: db.brands.length,
    total_partner_brands: db.partnerBrands.length,
    total_partner_products: db.partnerProducts.length,
    total_revenue: revenue.toFixed(2),
  };
}

export async function mockActivePromotions() {
  await delay();
  return db.promotions.filter((p) => p.status === "active");
}
