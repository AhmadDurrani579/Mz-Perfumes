import { useEffect, useMemo, useState } from 'react'
import { CartContext } from './cart-context.js'
import {
  getCartItems,
  getNextCartItems,
  getQuantityAdjustedCartItems,
  getRemainingCartItems,
  saveCartItems,
} from '../utils/cartStorage.js'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => getCartItems())

  useEffect(() => {
    saveCartItems(undefined, items)
  }, [items])

  const value = useMemo(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    cartTotal: items.reduce((total, item) => total + (item.price * item.quantity), 0),
    addItem: (item) => setItems((currentItems) => getNextCartItems(currentItems, item)),
    increaseItem: (cartKey) => {
      setItems((currentItems) => getQuantityAdjustedCartItems(currentItems, cartKey, 1))
    },
    decreaseItem: (cartKey) => {
      setItems((currentItems) => getQuantityAdjustedCartItems(currentItems, cartKey, -1))
    },
    removeItem: (productId, size, name, cartKey) => {
      setItems((currentItems) => getRemainingCartItems(currentItems, productId, size, name, cartKey))
    },
    clearCart: () => setItems(() => []),
  }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
