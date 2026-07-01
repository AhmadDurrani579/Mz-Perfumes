function toNumber(value, fallback = 0) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

export function getProductPrice(product) {
  const originalPrice = toNumber(product.actual_price)
  const discountPrice = toNumber(product.final_price ?? product.discounted_price)

  if (discountPrice > 0 && discountPrice < originalPrice) return discountPrice

  return originalPrice
}

function formatSize(sizeMl) {
  if (!sizeMl) return ''
  return `${sizeMl}ML`
}

function mapProductVariant(variant) {
  const originalPrice = toNumber(variant.actual_price ?? variant.price)
  const discountPrice = toNumber(variant.final_price ?? variant.discounted_price)
  const price = discountPrice > 0 && discountPrice < originalPrice ? discountPrice : originalPrice
  const sizeMl = toNumber(variant.size_ml)
  const variantId = variant.id ?? variant.variant_size_id ?? String(sizeMl)

  return {
    id: variantId,
    variantSizeId: variant.variant_size_id,
    sizeMl,
    size: formatSize(sizeMl),
    stockQuantity: toNumber(variant.stock_quantity),
    originalPrice,
    price,
  }
}

export function mapBackendProduct(product, fallbackImage = '') {
  const originalPrice = toNumber(product.actual_price)

  return {
    id: product.id,
    categoryId: product.category_id,
    brandId: product.brand_id,
    branchId: product.branch_id,
    house: product.brand_name ?? product.brand ?? '',
    name: product.name,
    slug: product.slug,
    description: product.description ?? '',
    originalPrice,
    price: getProductPrice(product),
    discount: toNumber(product.discount_percentage),
    discountLabel: product.discount_label,
    promotionApplied: Boolean(product.promotion_applied),
    stockQuantity: toNumber(product.stock_quantity),
    size: product.size ?? '',
    gender: product.gender ?? '',
    productType: product.product_type ?? '',
    image: product.main_image_url || fallbackImage,
    isFeatured: Boolean(product.is_featured),
    isActive: product.is_active !== false,
    variants: Array.isArray(product.variants) ? product.variants.map(mapProductVariant) : [],
  }
}
