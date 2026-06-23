import { useMemo, useState } from 'react'
import { CartContext } from './cart-context.js'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const value = useMemo(() => ({
    items,
    addItem: (item) => setItems((current) => [...current, item]),
    removeItem: (id) => setItems((current) => current.filter((item) => item.id !== id)),
  }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
