// src/api/api.js
// Central place for every network call the dashboard makes.
// All requests go through `request()`, which attaches the auth token,
// sets JSON headers, and turns non-2xx responses into thrown Errors.
//
// DEMO MODE: while isDemoMode() is true, every resource reads/writes to
// the in-memory/localStorage mock data in mockData.js instead of calling
// fetch(). Nothing else in the app needs to change when you're ready to
// go live — just stop enabling demo mode (or call clearToken()) and every
// page will start hitting the real endpoints below automatically.

import {
  createMockResource,
  mockActivePromotions,
} from "./mockData.js";

export const BASE_URL = "https://ahmadyarai-mz-essence.hf.space";
const TOKEN_KEY = "mz_essence_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(DEMO_KEY);
}

export function isAuthenticated() {
  return !!getToken() || isDemoMode();
}

// Demo mode lets you explore the UI before the real auth endpoint exists.
// It does NOT skip the API calls on each page — those still hit the real
// backend and will show "couldn't load" until /api/... is live. Remove
// this once POST /api/auth/login is ready on the backend.
const DEMO_KEY = "mz_essence_demo_mode";

export function enableDemoMode() {
  localStorage.setItem(DEMO_KEY, "1");
}

export function isDemoMode() {
  return localStorage.getItem(DEMO_KEY) === "1";
}

export { resetDemoData } from "./mockData.js";

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  } catch (networkErr) {
    throw new Error(
      "Couldn't reach the server. Check your connection and try again."
    );
  }

  if (res.status === 401) {
    clearToken();
    throw new Error("Your session has expired. Please sign in again.");
  }

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      message = data.detail || data.message || message;
    } catch {
      /* response wasn't JSON, keep default message */
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;

  try {
    return await res.json();
  } catch {
    return null;
  }
}

// Builds a standard CRUD set for a given base path, e.g. "/api/products/".
// `mockKey` maps this resource to its seeded data in mockData.js — pass
// the same key used in mockData.js's SEED object.
function crudResource(basePath, mockKey) {
  const mock = mockKey ? createMockResource(mockKey) : null;

  return {
    list: (params) => {
      if (isDemoMode() && mock) return mock.list();
      const qs = params ? `?${new URLSearchParams(params).toString()}` : "";
      return request(`${basePath}${qs}`);
    },
    get: (id) => {
      if (isDemoMode() && mock) return mock.get(id);
      return request(`${basePath}${id}/`);
    },
    create: (payload) => {
      if (isDemoMode() && mock) return mock.create(payload);
      return request(basePath, { method: "POST", body: JSON.stringify(payload) });
    },
    update: (id, payload) => {
      if (isDemoMode() && mock) return mock.update(id, payload);
      return request(`${basePath}${id}/`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    },
    remove: (id) => {
      if (isDemoMode() && mock) return mock.remove(id);
      return request(`${basePath}${id}/`, { method: "DELETE" });
    },
  };
}

export const api = {
  auth: {
    // No login endpoint was specified in the brief. This calls a
    // conventional /api/auth/login route; if your backend uses a
    // different path, update it here.
    login: (credentials) =>
      request("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
  },
  dashboard: {
    summary: () => request("/api/dashboard/summary"),
  },
  products: crudResource("/api/products/", "products"),
  categories: crudResource("/api/categories/", "categories"),
  brands: crudResource("/api/brands/", "brands"),
  branches: crudResource("/api/branches/", "branches"),
  banners: crudResource("/api/banners/", "banners"),
  promotions: {
    ...crudResource("/api/promotions/", "promotions"),
    activeList: () =>
      isDemoMode()
        ? mockActivePromotions()
        : request("/api/promotions/active/list"),
  },
  affiliates: crudResource("/api/affiliates/", "affiliates"),
  orders: crudResource("/api/orders/", "orders"),
  partnerBrands: crudResource("/api/partner-brands/", "partnerBrands"),
  partnerProducts: crudResource("/api/partner-products/", "partnerProducts"),
};
