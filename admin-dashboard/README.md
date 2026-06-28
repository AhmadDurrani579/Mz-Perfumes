# MZ Essence — Admin Dashboard

A React + Vite admin console for MZ Essence, a luxury perfume brand.

## Stack

- React 18 + Vite
- React Router v6
- Plain CSS (no framework) — design tokens in `src/styles.css`
- `fetch()` for all API calls (no axios)

## Getting started

```bash
npm install
npm run dev
```

The app talks to: `https://ahmadyarai-mz-essence.hf.space`

## Project structure

```
src/
├── api/
│   └── api.js              # fetch wrapper + every endpoint client
├── components/
│   ├── Sidebar.jsx
│   ├── Topbar.jsx
│   ├── DataTable.jsx       # search + table + status badges
│   └── ModalForm.jsx       # add/edit dialog, field-driven
├── pages/
│   ├── CrudPage.jsx         # shared list/create/edit/delete engine
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Products.jsx
│   ├── Categories.jsx
│   ├── Brands.jsx
│   ├── Branches.jsx
│   ├── Banners.jsx
│   ├── Promotions.jsx
│   ├── Affiliates.jsx
│   ├── Orders.jsx
│   ├── PartnerBrands.jsx
│   └── PartnerProducts.jsx
├── App.jsx
├── main.jsx
└── styles.css

```
## Demo mode (no backend yet)

If your API at `ahmadyarai-mz-essence.hf.space` isn't live yet, click
**"Continue without login (demo mode)"** on the login screen. This flips on
a flag (`isDemoMode()` in `src/api/api.js`) that routes every resource
through `src/api/mockData.js` instead of `fetch()` — so Products,
Categories, Orders, and the rest are all fully add/edit/delete-able against
seeded sample data, persisted to `localStorage` so it survives a refresh.
A "Reset sample data" button appears in the topbar to wipe it back to the
original seed.

**Switching to the real API later needs zero changes to any page.** Every
page calls `api.products.list()`, `api.orders.create()`, etc. — those
functions check demo mode internally and call the real endpoint instead
once you're signed in for real (i.e. once `clearToken()`/normal login sets
a real token and demo mode is off). To go fully live, just remove the demo
button from `Login.jsx` when you're ready, or leave it in as a permanent
"explore without an account" option.

## Notes & assumptions

- **Auth**: the brief didn't specify a login endpoint, so `api.auth.login`
  posts to `POST /api/auth/login` with `{ email, password }` and expects a
  `token` / `access_token` / `access` field in the response. Update
  `src/api/api.js` and `src/pages/Login.jsx` if your backend's auth route or
  response shape differs. The token is stored in `localStorage` and sent as
  `Authorization: Bearer <token>` on every request.
- **Record shape**: field names for each resource (e.g. `price`, `sku`,
  `discount_percent`) are reasonable guesses based on the module name.
  Adjust the `fields` and `columns` arrays at the top of each page file to
  match your actual API response/payload shape — the table and form are
  fully driven by those two arrays, so no other code needs to change.
- **CRUD pages** are all built on one shared engine (`pages/CrudPage.jsx`)
  to avoid duplicating list/search/modal/delete logic eleven times. Each
  resource page is just a config (columns + form fields + which `api.*`
  client to call).
- **Promotions** also calls `GET /api/promotions/active/list` and shows a
  small "Currently active" strip above the table.
- IDs in delete/update calls assume routes of the form
  `/api/<resource>/<id>/`. If your backend expects no trailing slash, adjust
  `crudResource()` in `src/api/api.js`.

## Build

``` bash
npm run build
npm run preview
```
