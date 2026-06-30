// src/api/sizesMock.js
//
// Temporary local data for "sizes" (the Variants master list: label +
// price) and "productVariants" (which sizes each product offers, plus
// its stock) — until your backend has real /api/sizes/ and
// /api/product-variants/ endpoints.
//
// Stored in localStorage so add/edit/delete survive a page refresh,
// same as a real backend would behave. Swap api.sizes and
// api.productVariants in api.js back to real fetch() calls once the
// backend exists — nothing else in the app needs to change, since every
// page only ever calls api.sizes.xxx() / api.productVariants.xxx(),
// never these functions directly.

const SIZES_KEY = "mz_mock_sizes";

const SEED_SIZES = [
  { id: 1, label: "10ml Tester", price: "300" },
  { id: 2, label: "30ml", price: "3000" },
  { id: 3, label: "50ml", price: "4800" },
];


function readStore(key, seed) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    /* fall through to reseed */
  }
  localStorage.setItem(key, JSON.stringify(seed));
  return seed.map((row) => ({ ...row }));
}

function writeStore(key, rows) {
  localStorage.setItem(key, JSON.stringify(rows));
}

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeCrudStore(key, seed) {
  let rows = readStore(key, seed);

  function persist() {
    writeStore(key, rows);
  }

  return {
    async list() {
      await delay();
      return rows;
    },
    async listWhere(predicate) {
      await delay();
      return rows.filter(predicate);
    },
    async get(id) {
      await delay();
      const row = rows.find((r) => String(r.id) === String(id));
      if (!row) throw new Error("Record not found.");
      return row;
    },
    async create(payload) {
      await delay();
      const ids = rows.map((r) => Number(r.id) || 0);
      const newId = (ids.length ? Math.max(...ids) : 0) + 1;
      const row = { id: newId, ...payload };
      rows = [row, ...rows];
      persist();
      return row;
    },
    async update(id, payload) {
      await delay();
      rows = rows.map((r) =>
        String(r.id) === String(id) ? { ...r, ...payload, id: r.id } : r
      );
      persist();
      return rows.find((r) => String(r.id) === String(id));
    },
    async remove(id) {
      await delay();
      rows = rows.filter((r) => String(r.id) !== String(id));
      persist();
      return null;
    },
  };
}

const sizesStore = makeCrudStore(SIZES_KEY, SEED_SIZES);

export const mockSizes = {
  list: () => sizesStore.list(),
  get: (id) => sizesStore.get(id),
  create: (payload) => sizesStore.create(payload),
  update: (id, payload) => sizesStore.update(id, payload),
  remove: (id) => sizesStore.remove(id),
};

