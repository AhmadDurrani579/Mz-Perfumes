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

function mapProductImage(image, index) {
  return {
    id: image.id ?? `image-${index + 1}`,
    url: image.image_url,
    sortOrder: toNumber(image.sort_order, index + 1),
    isPrimary: Boolean(image.is_primary),
  }
}

function getBrandName(product) {
  if (product.brand_name) return product.brand_name
  if (typeof product.brand === 'string') return product.brand
  if (product.brand?.name) return product.brand.name
  return ''
}

export function mapBackendProduct(product, fallbackImage = '') {
  const originalPrice = toNumber(product.actual_price)
  const mainImage = product.main_image_url || fallbackImage
  const images = Array.isArray(product.images)
    ? product.images
        .filter((image) => image?.image_url)
        .map(mapProductImage)
    : []

  return {
    id: product.id,
    categoryId: product.category_id,
    brandId: product.brand_id,
    branchId: product.branch_id,
    house: getBrandName(product),
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
    image: mainImage,
    images: images.length > 0
      ? images
      : [{
          id: 'main-image',
          url: mainImage,
          sortOrder: 1,
          isPrimary: true,
        }],
    isFeatured: Boolean(product.is_featured),
    isActive: product.is_active !== false,
    variants: Array.isArray(product.variants) ? product.variants.map(mapProductVariant) : [],
  }
}
