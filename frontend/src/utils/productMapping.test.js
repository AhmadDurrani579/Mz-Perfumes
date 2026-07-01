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
    images: [
      {
        id: 'image-1',
        image_url: 'https://example.com/janan-front.png',
        sort_order: 1,
        is_primary: true,
      },
      {
        id: 'image-2',
        image_url: 'https://example.com/janan-side.png',
        sort_order: 2,
        is_primary: false,
      },
    ],
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
  assert.deepEqual(product.images, [
    {
      id: 'image-1',
      url: 'https://example.com/janan-front.png',
      sortOrder: 1,
      isPrimary: true,
    },
    {
      id: 'image-2',
      url: 'https://example.com/janan-side.png',
      sortOrder: 2,
      isPrimary: false,
    },
  ])
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

test('maps backend product variants with size price and stock', () => {
  const product = mapBackendProduct({
    id: 'product-3',
    name: 'Variant Perfume',
    actual_price: '35',
    final_price: '30',
    stock_quantity: 4,
    size: '50ml',
    variants: [
      {
        id: 'variant-10',
        variant_size_id: 'size-10',
        size_ml: '10',
        stock_quantity: 2,
        actual_price: '12.50',
        final_price: '10.00',
      },
      {
        id: 'variant-50',
        variant_size_id: 'size-50',
        size_ml: '50',
        stock_quantity: 0,
        actual_price: '35.00',
        final_price: '30.00',
      },
    ],
  })

  assert.deepEqual(product.variants, [
    {
      id: 'variant-10',
      variantSizeId: 'size-10',
      sizeMl: 10,
      size: '10ML',
      stockQuantity: 2,
      originalPrice: 12.5,
      price: 10,
    },
    {
      id: 'variant-50',
      variantSizeId: 'size-50',
      sizeMl: 50,
      size: '50ML',
      stockQuantity: 0,
      originalPrice: 35,
      price: 30,
    },
  ])
})

test('uses variant size id as the selectable variant id when backend variant id is absent', () => {
  const product = mapBackendProduct({
    id: 'product-4',
    name: 'Store Product Variant Shape',
    variants: [
      {
        variant_size_id: 'size-10',
        size_ml: '10',
        stock_quantity: 2,
        actual_price: '12.50',
        final_price: '10.00',
      },
      {
        variant_size_id: 'size-50',
        size_ml: '50',
        stock_quantity: 8,
        actual_price: '35.00',
        final_price: '30.00',
      },
    ],
  })

  assert.equal(product.variants[0].id, 'size-10')
  assert.equal(product.variants[1].id, 'size-50')
})

test('falls back to the main image as the product detail gallery when no image list exists', () => {
  const product = mapBackendProduct({
    id: 'product-5',
    name: 'Single Image Perfume',
    main_image_url: 'https://example.com/single.png',
  })

  assert.deepEqual(product.images, [
    {
      id: 'main-image',
      url: 'https://example.com/single.png',
      sortOrder: 1,
      isPrimary: true,
    },
  ])
})
