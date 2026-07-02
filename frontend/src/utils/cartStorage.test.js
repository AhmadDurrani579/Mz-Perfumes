import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  addCartItem,
  clearCartItems,
  getCartItems,
  removeCartItem,
} from './cartStorage.js'

function createStorage(initialValue) {
  const values = new Map()
  if (initialValue !== undefined) values.set('mz-shopping-bag', initialValue)

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  }
}

const sampleItem = {
  cart_key: '123|Shahnaz Perfume|30ML',
  product_id: '123',
  name: 'Shahnaz Perfume',
  size: '30ML',
  price: 3000,
  quantity: 2,
  image: 'https://example.com/image.jpg',
}

test('reads cart items from localStorage in sequence', () => {
  assert.deepEqual(getCartItems(createStorage(JSON.stringify([sampleItem]))), [sampleItem])
})

test('adds the same product and size by increasing quantity', () => {
  const storage = createStorage()

  addCartItem(storage, sampleItem)
  const items = addCartItem(storage, { ...sampleItem, quantity: 1 })

  assert.deepEqual(items, [{ ...sampleItem, quantity: 3 }])
})

test('adds a different product or size after the existing item', () => {
  const storage = createStorage(JSON.stringify([sampleItem]))
  const nextItem = {
    cart_key: '789|Rose Oud|50ML',
    product_id: '789',
    name: 'Rose Oud',
    size: '50ML',
    price: 5000,
    quantity: 1,
    image: 'https://example.com/rose.jpg',
  }

  assert.deepEqual(addCartItem(storage, nextItem), [sampleItem, nextItem])
})

test('does not merge different product names that share an id and size', () => {
  const storage = createStorage(JSON.stringify([sampleItem]))
  const nextItem = {
    cart_key: '123|Different Perfume|30ML',
    product_id: '123',
    name: 'Different Perfume',
    size: '30ML',
    price: 3500,
    quantity: 1,
    image: 'https://example.com/different.jpg',
  }

  assert.deepEqual(addCartItem(storage, nextItem), [sampleItem, nextItem])
})

test('removes one matching item and clears stored cart items', () => {
  const nextItem = {
    cart_key: '789|Rose Oud|50ML',
    product_id: '789',
    name: 'Rose Oud',
    size: '50ML',
    price: 5000,
    quantity: 1,
    image: 'https://example.com/rose.jpg',
  }
  const storage = createStorage(JSON.stringify([sampleItem, nextItem]))

  assert.deepEqual(removeCartItem(storage, sampleItem.product_id, sampleItem.size), [nextItem])
  addCartItem(storage, sampleItem)
  assert.deepEqual(clearCartItems(storage), [])
  assert.deepEqual(getCartItems(storage), [])
})

test('removes only the matching name when product id and size are shared', () => {
  const nextItem = {
    cart_key: '123|Different Perfume|30ML',
    product_id: '123',
    name: 'Different Perfume',
    size: '30ML',
    price: 3500,
    quantity: 1,
    image: 'https://example.com/different.jpg',
  }
  const storage = createStorage(JSON.stringify([sampleItem, nextItem]))

  assert.deepEqual(removeCartItem(storage, sampleItem.product_id, sampleItem.size, sampleItem.name), [nextItem])
})
