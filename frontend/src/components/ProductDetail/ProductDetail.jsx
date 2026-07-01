import { useCart } from '../../hooks/useCart.js'
import { createWhatsAppUrl } from '../../utils/productCollection.js'

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
  const stockLabel = product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'
  const stockStatus = product.stockQuantity > 0 ? 'available' : 'unavailable'

  return (
    <section className="product-detail product-detail-page" aria-labelledby="product-detail-title">
      <article className="product-detail__panel">
        <button className="product-detail__back-button" type="button" onClick={onBack}>
          Back to collection
        </button>

        <div className="product-detail__media">
          <img src={product.image} alt={`${product.name} perfume`} />
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

          <div className="product-detail__meta" aria-label="Product details">
            <DetailItem label="SIZE" value={product.size} />
            <DetailItem label="STOCK" value={stockLabel} status={stockStatus} />
            <DetailItem label="GENDER" value={product.gender} />
          </div>

          <div className="product-detail__purchase" aria-label="Purchase options">
            <button
              className="product-card__button product-card__button--primary product-detail__cart-button"
              type="button"
              onClick={() => addItem(product)}
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
