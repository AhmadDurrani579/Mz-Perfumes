function formatCurrency(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(value)
}

export default function ProductCard({ product, onViewDetails }) {
  const firstVariant = product.variants?.[0]
  const displayedSize = firstVariant?.size || product.size
  const displayedPrice = firstVariant?.price ?? product.price
  const hasDiscount = product.promotionApplied || product.discount > 0
  const discountBadgeLabel = product.discount > 0
    ? `-${product.discount}%`
    : product.discountLabel
  const visibleDescription = product.description || 'Premium fragrance'

  return (
    <article className="product-card">
      <button
        className="product-card__media product-card__media-button"
        type="button"
        onClick={() => onViewDetails(product)}
        aria-label={`View details for ${product.name}`}
      >
        <img
          className="product-card__image"
          src={product.image}
          alt={`${product.name} perfume`}
        />
        {hasDiscount && (
          <span className="product-card__discount">
            {discountBadgeLabel}
          </span>
        )}
      </button>

      <div className="product-card__content">
        {product.house && <p className="product-card__house">{product.house}</p>}
        <h3>
          <button
            className="product-card__title-button"
            type="button"
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </button>
        </h3>
        <p className="product-card__description">{visibleDescription}</p>
        <p className="product-card__pricing">
          {displayedSize && <span>{displayedSize} - </span>}
          <strong>{formatCurrency(displayedPrice)}</strong>
        </p>
      </div>

      <button
        className="product-card__details-trigger"
        type="button"
        onClick={() => onViewDetails(product)}
      >
        VIEW DETAILS
      </button>
    </article>
  )
}
