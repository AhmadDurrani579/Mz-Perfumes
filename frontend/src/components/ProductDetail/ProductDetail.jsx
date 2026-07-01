import { useMemo, useState } from 'react'
import { useCart } from '../../hooks/useCart.js'
import { createWhatsAppUrl } from '../../utils/productCollection.js'

function formatCurrency(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(value)
}

function DetailItem({ label, value, status }) {
  if (!value && value !== 0) return null

  return (
    <div className="product-detail__meta-item">
      <i aria-hidden="true" />
      <span>{label}</span>
      <strong className={status ? `is-${status}` : undefined}>{value}</strong>
    </div>
  )
}

export default function ProductDetail({ product, onBack }) {
  const { addItem } = useCart()
  const variants = product.variants ?? []
  const productImages = product.images?.length
    ? product.images
    : [{ id: 'main-image', url: product.image, isPrimary: true }]
  const [selectedImageId, setSelectedImage] = useState(productImages[0]?.id ?? 'main-image')
  const selectedImage = productImages.find((image) => image.id === selectedImageId) ?? productImages[0]
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id ?? '')
  const selectedVariant = variants.find((variant) => variant.id === selectedVariantId) ?? variants[0]
  const selectedProduct = useMemo(() => {
    if (!selectedVariant) return product

    return {
      ...product,
      id: `${product.id}-${selectedVariant.id}`,
      originalProductId: product.id,
      selectedVariantId: selectedVariant.id,
      variantSizeId: selectedVariant.variantSizeId,
      size: selectedVariant.size,
      stockQuantity: selectedVariant.stockQuantity,
      originalPrice: selectedVariant.originalPrice,
      price: selectedVariant.price,
    }
  }, [product, selectedVariant])
  const stockLabel = selectedProduct.stockQuantity > 0 ? `${selectedProduct.stockQuantity} in stock` : 'Out of stock'
  const stockStatus = selectedProduct.stockQuantity > 0 ? 'available' : 'unavailable'
  const hasDiscount = selectedProduct.originalPrice > selectedProduct.price

  return (
    <section className="product-detail product-detail-page" aria-labelledby="product-detail-title">
      <article className="product-detail__panel">
        <button className="product-detail__back-button" type="button" onClick={onBack}>
          Back to collection
        </button>

        <div className="product-detail__media">
          <img
            className="product-detail__main-image"
            src={selectedImage.url}
            alt={`${product.name} perfume`}
          />

          {productImages.length > 1 && (
            <div className="product-detail__thumbnails" aria-label="Product images">
              {productImages.map((image, index) => (
                <button
                  className="product-detail__thumbnail-button"
                  type="button"
                  key={image.id}
                  aria-label={`View ${product.name} image ${index + 1}`}
                  aria-pressed={image.id === selectedImage.id}
                  onClick={() => setSelectedImage(image.id)}
                >
                  <img src={image.url} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-detail__content">
          <p className="product-detail__brand">Mz Essence</p>
          <h2 id="product-detail-title">{product.name}</h2>
          {product.productType && <p className="product-detail__type">{product.productType}</p>}

          <section className="product-detail__description-block" aria-labelledby="product-detail-description-title">
            <h3 id="product-detail-description-title">DESCRIPTION</h3>
            <p className="product-detail__description">
              {product.description || 'Premium fragrance selected for the Mz Essence collection.'}
            </p>
          </section>

          <div className="product-detail__price" aria-live="polite">
            <strong>{formatCurrency(selectedProduct.price)}</strong>
            {hasDiscount && <del>{formatCurrency(selectedProduct.originalPrice)}</del>}
          </div>

          <p className={`product-detail__stock is-${stockStatus}`}>{stockLabel}</p>

          {variants.length > 0 && (
            <div className="product-detail__variants" aria-label="Choose size">
              {variants.map((variant) => {
                const isSelected = variant.id === selectedVariant?.id

                return (
                  <button
                    className="product-detail__variant-button"
                    type="button"
                    key={variant.id}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedVariantId(variant.id)}
                  >
                    <span>{variant.size}</span>
                    <strong>{formatCurrency(variant.price)}</strong>
                  </button>
                )
              })}
            </div>
          )}

          <div className="product-detail__meta" aria-label="Product details">
            <DetailItem label="GENDER" value={product.gender} />
          </div>

          <div className="product-detail__purchase" aria-label="Purchase options">
            <button
              className="product-card__button product-card__button--primary product-detail__cart-button"
              type="button"
              onClick={() => addItem(selectedProduct)}
            >
              <span aria-hidden="true">Cart</span>
              Add to cart
            </button>

            <a
              className="product-card__button product-card__button--secondary product-detail__whatsapp-button"
              href={createWhatsAppUrl(product.name)}
              target="_blank"
              rel="noreferrer"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </article>
    </section>
  )
}
