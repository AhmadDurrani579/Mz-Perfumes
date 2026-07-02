# Frontend Shopping Bag Checkout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a frontend-only shopping bag that saves one selected product variant with quantity to localStorage, submits the existing `/api/orders/` payload, and opens WhatsApp with the same order details.

**Architecture:** Cart state lives in `CartProvider` and is persisted through a small storage utility. `ProductDetail` creates a normalized single-product order item, `Cart` displays the bag plus checkout form, and `api.js` posts the current backend order schema without backend changes.

**Tech Stack:** React 19, Vite, Node test runner, browser localStorage, existing FastAPI `/api/orders/` endpoint.

---

### Task 1: Cart Storage

**Files:**
- Create: `frontend/src/utils/cartStorage.js`
- Create: `frontend/src/utils/cartStorage.test.js`
- Modify: `frontend/src/context/CartContext.jsx`

- [x] **Step 1: Write failing tests for reading, adding, replacing, removing, and clearing one cart item.**
- [x] **Step 2: Run focused tests and verify they fail before implementation.**
- [x] **Step 3: Implement storage helpers and wire them into `CartProvider`.**
- [x] **Step 4: Re-run focused tests.**

### Task 2: Product Add To Cart

**Files:**
- Modify: `frontend/src/components/ProductDetail/ProductDetail.jsx`
- Modify: `frontend/src/components/ProductDetail/ProductDetail.test.js`

- [x] **Step 1: Write failing source tests for `product_id`, `size`, `quantity`, `price`, `image`, and a single `addItem(cartItem)` call.**
- [x] **Step 2: Update ProductDetail to save the selected variant and quantity once.**
- [x] **Step 3: Re-run focused tests.**

### Task 3: Shopping Bag Checkout

**Files:**
- Modify: `frontend/src/components/Cart/Cart.jsx`
- Create: `frontend/src/components/Cart/Cart.test.js`
- Modify: `frontend/src/App.jsx`
- Modify: `frontend/src/App.test.js`
- Modify: `frontend/src/components/Header/Header.jsx`
- Modify: `frontend/src/components/Header/Header.test.js`
- Modify: `frontend/src/services/api.js`
- Modify: `frontend/src/services/api.test.js`
- Modify: `frontend/src/utils/productCollection.js`
- Create: `frontend/src/utils/productCollection.test.js`
- Modify: `frontend/src/styles/globals.css`

- [x] **Step 1: Write failing tests for bag opening, checkout form, `/api/orders/`, and WhatsApp order message.**
- [x] **Step 2: Implement bag UI, form submission, API call, clear cart, and WhatsApp redirect.**
- [x] **Step 3: Re-run focused tests.**

### Task 4: Verification

**Files:**
- All frontend touched files.

- [x] **Step 1: Run full frontend tests.**
- [x] **Step 2: Run frontend lint.**
- [x] **Step 3: Run frontend build.**
- [x] **Step 4: Confirm backend files are unchanged.**
