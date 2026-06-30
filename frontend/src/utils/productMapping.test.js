import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mapBackendProduct } from './productMapping.js'

test('maps backend product detail fields for the product detail view', () => {
  const product = mapBackendProduct({
    id: 'product-1',
    category_id: 'luxury',
    brand_id: 'brand-1',
    branch_id: 'main-branch',
    brand_name: 'Janan',
    name: 'Janan Gold Edition',
    slug: 'janan-gold-edition',
    description: 'A luxurious blend crafted for lasting elegance.',
    actual_price: '50',
    discounted_price: '0',
    final_price: '45',
    discount_percentage: '10',
    discount_label: '10% OFF',
    promotion_applied: true,
    stock_quantity: 8,
    size: '100ml',
    gender: 'Unisex',
    product_type: 'Eau de Parfum',
    main_image_url: 'https://example.com/janan.png',
    is_featured: true,
    is_active: true,
  })

  assert.equal(product.id, 'product-1')
  assert.equal(product.brandId, 'brand-1')
  assert.equal(product.categoryId, 'luxury')
  assert.equal(product.branchId, 'main-branch')
  assert.equal(product.house, 'Janan')
  assert.equal(product.name, 'Janan Gold Edition')
  assert.equal(product.slug, 'janan-gold-edition')
  assert.equal(product.description, 'A luxurious blend crafted for lasting elegance.')
  assert.equal(product.originalPrice, 50)
  assert.equal(product.price, 45)
  assert.equal(product.discount, 10)
  assert.equal(product.discountLabel, '10% OFF')
  assert.equal(product.promotionApplied, true)
  assert.equal(product.stockQuantity, 8)
  assert.equal(product.size, '100ml')
  assert.equal(product.gender, 'Unisex')
  assert.equal(product.productType, 'Eau de Parfum')
  assert.equal(product.image, 'https://example.com/janan.png')
  assert.equal(product.isFeatured, true)
  assert.equal(product.isActive, true)
})

test('uses actual price when backend discount price is zero', () => {
  const product = mapBackendProduct({
    id: 'product-2',
    name: 'No Discount Perfume',
    actual_price: '75',
    discounted_price: '0',
    final_price: '0',
  })

  assert.equal(product.originalPrice, 75)
  assert.equal(product.price, 75)
})
