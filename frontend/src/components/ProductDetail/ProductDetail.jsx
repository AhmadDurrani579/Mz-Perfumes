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

export default function ProductDetail({ product }) {
  const { addItem } = useCart()
  const variants = product.variants ?? []
  const productImages = product.images?.length
    ? product.images
    : [{ id: 'main-image', url: product.image, isPrimary: true }]
  const [selectedImageId, setSelectedImage] = useState(productImages[0]?.id ?? 'main-image')
  const selectedImageIndex = Math.max(
    productImages.findIndex((image) => image.id === selectedImageId),
    0,
  )
  const selectedImage = productImages[selectedImageIndex] ?? productImages[0]
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id ?? '')
  const [quantity, setQuantity] = useState(1)
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
  const hasMultipleImages = productImages.length > 1

  const handlePreviousImage = () => {
    const previousIndex = (selectedImageIndex - 1 + productImages.length) % productImages.length

    setSelectedImage(productImages[previousIndex].id)
  }

  const handleNextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % productImages.length

    setSelectedImage(productImages[nextIndex].id)
  }

  const handleDecreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1))
  }

  const handleIncreaseQuantity = () => {
    setQuantity((current) => current + 1)
  }

  const handleAddToCart = () => {
    const cartItem = {
      product_id: product.id,
      name: product.name,
      size: selectedProduct.size,
      price: selectedProduct.price,
      quantity,
      image: selectedImage?.url ?? product.image,
      cart_key: `${product.id}|${product.name}|${selectedProduct.size}`,
    }

    addItem(cartItem)
  }

  return (
    <section className="product-detail product-detail-page" aria-labelledby="product-detail-title">
      <article className="product-detail__panel">
        <div className="product-detail__media">
          <div className="product-detail__image-stage">
            {hasMultipleImages && (
              <button
                className="product-detail__slider-button product-detail__slider-button--previous"
                type="button"
                aria-label="Previous product image"
                onClick={handlePreviousImage}
              >
                <span aria-hidden="true">‹</span>
              </button>
            )}

            <img
              className="product-detail__main-image"
              src={selectedImage.url}
              alt={`${product.name} perfume`}
            />

            {hasMultipleImages && (
              <button
                className="product-detail__slider-button product-detail__slider-button--next"
                type="button"
                aria-label="Next product image"
                onClick={handleNextImage}
              >
                <span aria-hidden="true">›</span>
              </button>
            )}
          </div>

          {hasMultipleImages && (
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

          <a className="product-detail__description-link" href="#product-detail-description">
            DESCRIPTION
          </a>

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
            <div className="product-detail__quantity" aria-label="Quantity selector">
              <button
                className="product-detail__quantity-button"
                type="button"
                aria-label="Decrease quantity"
                onClick={handleDecreaseQuantity}
              >
                −
              </button>
              <strong>{quantity}</strong>
              <button
                className="product-detail__quantity-button"
                type="button"
                aria-label="Increase quantity"
                onClick={handleIncreaseQuantity}
              >
                +
              </button>
            </div>

            <button
              className="product-card__button product-card__button--primary product-detail__cart-button"
              type="button"
              onClick={handleAddToCart}
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

        <section
          id="product-detail-description"
          className="product-detail__description-section"
        >
          <p className="product-detail__description">
            {product.description || 'Premium fragrance selected for the Mz Essence collection.'}
          </p>
        </section>
      </article>
    </section>
  )
}
