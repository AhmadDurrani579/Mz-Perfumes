import assert from 'node:assert/strict'
import { test } from 'node:test'

import { createOrderWhatsAppUrl, createWhatsAppUrl } from './productCollection.js'

test('creates product enquiry whatsapp urls', () => {
  assert.match(createWhatsAppUrl('Shahnaz Perfume'), /^https:\/\/wa\.me\/923715669424\?text=/)
})

test('creates whatsapp order urls with customer and cart details', () => {
  const url = createOrderWhatsAppUrl({
    customer: {
      customer_name: 'Ali',
      customer_phone: '123',
      city: 'Kabul',
      address: 'Street 1',
    },
    items: [
      {
        name: 'Shahnaz Perfume',
        size: '30ML',
        price: 3000,
        quantity: 2,
      },
      {
        name: 'Rose Oud',
        size: '50ML',
        price: 5000,
        quantity: 1,
      },
    ],
    total: 11000,
  })
  const decoded = decodeURIComponent(url)

  assert.match(url, /^https:\/\/wa\.me\/923715669424\?text=/)
  assert.match(decoded, /Customer: Ali/)
  assert.match(decoded, /Phone: 123/)
  assert.match(decoded, /1\. Shahnaz Perfume/)
  assert.match(decoded, /2\. Rose Oud/)
  assert.match(decoded, /Size: 30ML/)
  assert.match(decoded, /Quantity: 2/)
  assert.match(decoded, /Grand Total: 11000/)
})
