import { useState } from 'react'
import { useCart } from '../../hooks/useCart.js'
import { createOrder } from '../../services/api.js'
import { createOrderWhatsAppUrl } from '../../utils/productCollection.js'

function formatCurrency(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(value)
}

const emptyCustomer = {
  customer_name: '',
  customer_phone: '',
  customer_email: '',
  city: '',
  address: '',
  notes: '',
}

export default function Cart({ onClose }) {
  const { items, increaseItem, decreaseItem, removeItem, clearCart, cartTotal } = useCart()
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [customer, setCustomer] = useState(emptyCustomer)
  const [status, setStatus] = useState('idle')
  const hasItems = items.length > 0

  const handleCustomerChange = (event) => {
    const { name, value } = event.target
    setCustomer((current) => ({ ...current, [name]: value }))
  }

  const handleCheckout = async (event) => {
    event.preventDefault()
    if (!hasItems) return

    setStatus('submitting')

    try {
      await Promise.all(items.map((item) => (
        createOrder({
          customer_name: customer.customer_name,
          customer_phone: customer.customer_phone,
          customer_email: customer.customer_email || null,
          product_id: item.product_id,
          quantity: item.quantity,
          size: item.size,
          total_amount: item.price * item.quantity,
          address: customer.address || null,
          city: customer.city || null,
          notes: customer.notes || null,
        })
      )))

      window.open(createOrderWhatsAppUrl({ customer, items, total: cartTotal }), '_blank', 'noreferrer')
      clearCart()
      setStatus('sent')
      setShowCheckoutForm(false)
      setCustomer(emptyCustomer)
    } catch {
      setStatus('error')
    }
  }

  return (
    <aside className="shopping-bag" aria-label="Shopping bag">
      <div className="shopping-bag__header">
        <h2>SHOPPING BAG</h2>
        <button type="button" className="shopping-bag__close" onClick={onClose} aria-label="Close shopping bag">
          x
        </button>
      </div>

      {!hasItems ? (
        <p className="shopping-bag__empty">Your bag is empty.</p>
      ) : (
        <>
          <div className="shopping-bag__items">
            {items.map((item) => (
              <article className="shopping-bag__item" key={item.cart_key}>
                {item.image && <img src={item.image} alt="" />}
                <div className="shopping-bag__item-copy">
                  <h3>{item.name}</h3>
                  <p>{item.size}</p>
                  <strong>{formatCurrency(item.price)}</strong>
                  <div className="shopping-bag__item-actions">
                    <div className="shopping-bag__quantity-control" aria-label={`Quantity for ${item.name}`}>
                      <button
                        type="button"
                        className="shopping-bag__quantity-button"
                        onClick={() => decreaseItem(item.cart_key)}
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity for ${item.name}`}
                      >
                        -
                      </button>
                      <span className="shopping-bag__quantity">{item.quantity}</span>
                      <button
                        type="button"
                        className="shopping-bag__quantity-button"
                        onClick={() => increaseItem(item.cart_key)}
                        aria-label={`Increase quantity for ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button type="button" onClick={() => removeItem(item.product_id, item.size, item.name, item.cart_key)}>
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="shopping-bag__grand-total">
            <span>Grand Total</span>
            <strong>{formatCurrency(cartTotal)}</strong>
          </div>

          {showCheckoutForm && (
            <form className="shopping-bag__form" onSubmit={handleCheckout}>
              <input
                name="customer_name"
                value={customer.customer_name}
                onChange={handleCustomerChange}
                placeholder="Full name"
                required
              />
              <input
                name="customer_phone"
                value={customer.customer_phone}
                onChange={handleCustomerChange}
                placeholder="Phone number"
                required
              />
              <input
                name="customer_email"
                value={customer.customer_email}
                onChange={handleCustomerChange}
                placeholder="Email"
                type="email"
              />
              <input
                name="city"
                value={customer.city}
                onChange={handleCustomerChange}
                placeholder="City"
              />
              <textarea
                name="address"
                value={customer.address}
                onChange={handleCustomerChange}
                placeholder="Address"
              />
              <textarea
                name="notes"
                value={customer.notes}
                onChange={handleCustomerChange}
                placeholder="Notes"
              />
              <button type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'SUBMITTING...' : 'SUBMIT ORDER'}
              </button>
            </form>
          )}

          {status === 'sent' && <p className="shopping-bag__status">Order submitted.</p>}
          {status === 'error' && <p className="shopping-bag__status is-error">Order could not be submitted.</p>}

          {!showCheckoutForm && (
            <button
              className="shopping-bag__checkout"
              type="button"
              onClick={() => setShowCheckoutForm(true)}
            >
              CHECKOUT <span>-</span> {formatCurrency(cartTotal)}
            </button>
          )}
        </>
      )}
    </aside>
  )
}
