export default function ProductCard({ product, onViewDetails }) {
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
      </button>

      <div className="product-card__content">
        <h3>
          <button
            className="product-card__title-button"
            type="button"
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </button>
        </h3>
      </div>
    </article>
  )
}
