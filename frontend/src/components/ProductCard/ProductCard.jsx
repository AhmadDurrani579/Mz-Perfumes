import { useCart } from '../../hooks/useCart.js'
import { createWhatsAppUrl } from '../../utils/productCollection.js'

export default function ProductCard({ product, onViewDetails }) {
  const { addItem } = useCart()
  const hasDiscount = product.promotionApplied || product.discount > 0;
  
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
            {product.discountLabel || `${product.discount}% OFF`}
          </span>
        )}
      </button>

      <div className="product-card__content">
        <p className="product-card__house">{product.house}</p>
        <h3>
          <button
            className="product-card__title-button"
            type="button"
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </button>
        </h3>
        <p className="product-card__description">{product.description}</p>
        <p className="product-card__pricing">
          {hasDiscount && <del>£{product.originalPrice}</del>}
          <strong>£{product.price}</strong>
        </p>
        <button
          className="product-card__button product-card__button--primary"
          type="button"
          onClick={() => addItem(product)}
        >
          Add to cart
        </button>
        <a
          className="product-card__button product-card__button--secondary"
          href={createWhatsAppUrl(product.name)}
          target="_blank"
          rel="noreferrer"
        >
          Enquire on WhatsApp
        </a>
      </div>
    </article>
  )
}
