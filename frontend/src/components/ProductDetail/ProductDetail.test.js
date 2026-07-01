import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('./ProductDetail.jsx', import.meta.url), 'utf8')

test('shows customer-facing product fields in the product detail view', () => {
  assert.match(source, /product\.description/)
  assert.match(source, /Mz Essence/)
  assert.match(source, /product\.productType/)
  assert.match(source, /selectedProduct\.stockQuantity/)
  assert.match(source, /size: selectedVariant\.size/)
  assert.match(source, /product\.gender/)
  assert.match(source, /DESCRIPTION/)
  assert.match(source, /GENDER/)
  assert.doesNotMatch(source, /Category ID/)
  assert.doesNotMatch(source, /Product ID/)
  assert.doesNotMatch(source, /Slug/)
})

test('keeps only gender in the lower product details', () => {
  assert.doesNotMatch(source, /<DetailItem label="SIZE"/)
  assert.doesNotMatch(source, /<DetailItem label="STOCK"/)
  assert.match(source, /<DetailItem label="GENDER" value={product\.gender} \/>/)
})

test('keeps purchase actions available in product details', () => {
  assert.match(source, /addItem\(selectedProduct\)/)
  assert.match(source, /createWhatsAppUrl\(product\.name\)/)
  assert.match(source, /onBack/)
})

test('lets customers choose a variant and uses its price stock and size', () => {
  assert.match(source, /useState/)
  assert.match(source, /selectedVariant/)
  assert.match(source, /product\.variants/)
  assert.match(source, /setSelectedVariantId/)
  assert.match(source, /selectedVariant\.price/)
  assert.match(source, /selectedVariant\.stockQuantity/)
  assert.match(source, /selectedVariant\.size/)
})

test('shows multiple product images as a selectable detail gallery', () => {
  assert.match(source, /productImages/)
  assert.match(source, /selectedImage/)
  assert.match(source, /setSelectedImage/)
  assert.match(source, /src={selectedImage\.url}/)
  assert.match(source, /product-detail__thumbnails/)
  assert.match(source, /productImages\.map/)
})

test('keeps variant circles limited to size and price text', () => {
  assert.match(source, /<span>{variant\.size}<\/span>/)
  assert.match(source, /<strong>{formatCurrency\(variant\.price\)}<\/strong>/)
  assert.doesNotMatch(source, /<em>{variant\.stockQuantity/)
})

test('shows description before price stock and variant choices', () => {
  const descriptionIndex = source.indexOf('product-detail__description-block')
  const priceIndex = source.indexOf('product-detail__price')
  const stockIndex = source.indexOf('product-detail__stock')
  const variantsIndex = source.indexOf('product-detail__variants')

  assert.ok(descriptionIndex > -1)
  assert.ok(priceIndex > -1)
  assert.ok(stockIndex > -1)
  assert.ok(variantsIndex > -1)
  assert.ok(descriptionIndex < priceIndex)
  assert.ok(descriptionIndex < stockIndex)
  assert.ok(descriptionIndex < variantsIndex)
})

test('renders as a product detail page instead of a modal dialog', () => {
  assert.match(source, /product-detail-page/)
  assert.match(source, /Back to collection/)
  assert.doesNotMatch(source, /role="dialog"/)
  assert.doesNotMatch(source, /aria-modal/)
  assert.doesNotMatch(source, /product-detail__backdrop/)
  assert.doesNotMatch(source, /product-detail__close/)
})
