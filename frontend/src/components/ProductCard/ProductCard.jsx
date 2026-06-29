import { useCart } from '../../hooks/useCart.js'
import { createWhatsAppUrl } from '../../utils/productCollection.js'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const hasDiscount = product.discount > 0

  return (
    <article className="product-card">
     <div className="product-card__media">
        <img
          className="product-card__image"
          src={product.image}
          alt={`${product.name} perfume`}
        />

        {hasDiscount && (
          <span className="product-card__discount">
            {product.discount}% OFF
          </span>
        )}
      </div>

      <div className="product-card__content">
        <p className="product-card__house">{product.house}</p>
        <h3>{product.name}</h3>
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
