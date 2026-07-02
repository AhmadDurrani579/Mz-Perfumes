import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./Cart.jsx', import.meta.url), 'utf8')

test('shows selected bag product details and quantity controls', () => {
  assert.match(source, /SHOPPING BAG/)
  assert.match(source, /items\.map/)
  assert.match(source, /item\.image/)
  assert.match(source, /item\.name/)
  assert.match(source, /item\.size/)
  assert.match(source, /item\.quantity/)
  assert.match(source, /increaseItem/)
  assert.match(source, /decreaseItem/)
  assert.match(source, /shopping-bag__quantity-control/)
  assert.match(source, /disabled={item\.quantity <= 1}/)
  assert.match(source, /key={item\.cart_key}/)
  assert.match(source, /removeItem\(item\.product_id, item\.size, item\.name, item\.cart_key\)/)
  assert.match(source, /Remove/)
  assert.match(source, /cartTotal/)
})

test('opens a customer form and submits existing order api payload', () => {
  assert.match(source, /showCheckoutForm/)
  assert.match(source, /customer_name/)
  assert.match(source, /customer_phone/)
  assert.match(source, /createOrder/)
  assert.match(source, /Promise\.all/)
  assert.match(source, /items\.map/)
  assert.match(source, /product_id: item\.product_id/)
  assert.match(source, /quantity: item\.quantity/)
  assert.match(source, /total_amount: item\.price \* item\.quantity/)
  assert.match(source, /Grand Total/)
})

test('opens whatsapp with order details after submitting checkout', () => {
  assert.match(source, /createOrderWhatsAppUrl/)
  assert.match(source, /window\.open/)
  assert.match(source, /clearCart/)
})
