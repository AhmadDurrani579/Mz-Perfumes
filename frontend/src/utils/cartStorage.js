const CART_STORAGE_KEY = 'mz-shopping-bag'

function getDefaultStorage() {
  return globalThis.localStorage
}

function normalizeCartItem(item) {
  const normalizedItem = {
    product_id: String(item.product_id ?? ''),
    name: item.name ?? '',
    size: item.size ?? '',
    price: Number(item.price) || 0,
    quantity: Math.max(1, Number(item.quantity) || 1),
    image: item.image ?? '',
  }

  return {
    ...normalizedItem,
    cart_key: item.cart_key ?? createCartKey(normalizedItem),
  }
}

function createCartKey(item) {
  return [item.product_id, item.name, item.size].map((value) => String(value ?? '').trim()).join('|')
}

function isSameCartItem(first, second) {
  return first.cart_key === second.cart_key
}

export function getCartItems(storage = getDefaultStorage()) {
  if (!storage) return []

  try {
    const parsed = JSON.parse(storage.getItem(CART_STORAGE_KEY) ?? '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalizeCartItem).filter((item) => item.product_id)
  } catch {
    return []
  }
}

export function saveCartItems(storage = getDefaultStorage(), items) {
  if (!storage) return items.map(normalizeCartItem)

  const normalizedItems = items.map(normalizeCartItem).filter((item) => item.product_id)
  storage.setItem(CART_STORAGE_KEY, JSON.stringify(normalizedItems))
  return normalizedItems
}

export function addCartItem(storage = getDefaultStorage(), item) {
  const currentItems = getCartItems(storage)
  const nextItem = normalizeCartItem(item)
  const matchingItem = currentItems.find((currentItem) => isSameCartItem(currentItem, nextItem))
  const nextItems = matchingItem
    ? currentItems.map((currentItem) => (
        isSameCartItem(currentItem, nextItem)
          ? { ...currentItem, quantity: currentItem.quantity + nextItem.quantity }
          : currentItem
      ))
    : [...currentItems, nextItem]

  return saveCartItems(storage, nextItems)
}

export function removeCartItem(storage = getDefaultStorage(), productId, size, name = '', cartKey = '') {
  const nextItems = getCartItems(storage).filter((item) => (
    cartKey || name
      ? item.cart_key !== (cartKey || createCartKey({ product_id: productId, name, size }))
      : item.product_id !== String(productId) || item.size !== size
  ))

  return saveCartItems(storage, nextItems)
}

export function clearCartItems(storage = getDefaultStorage()) {
  if (storage) storage.removeItem(CART_STORAGE_KEY)
  return []
}
