import { useMemo, useState } from 'react'
import { CartContext } from './cart-context.js'
import {
  addCartItem,
  clearCartItems,
  getCartItems,
  removeCartItem,
} from '../utils/cartStorage.js'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => getCartItems())
  const value = useMemo(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    cartTotal: items.reduce((total, item) => total + (item.price * item.quantity), 0),
    addItem: (item) => setItems(() => addCartItem(undefined, item)),
    removeItem: (productId, size, name, cartKey) => {
      setItems(() => removeCartItem(undefined, productId, size, name, cartKey))
    },
    clearCart: () => setItems(() => clearCartItems()),
  }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
