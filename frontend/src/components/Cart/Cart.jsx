import { useCart } from '../../hooks/useCart.js'

export default function Cart() {
  const { items, removeItem } = useCart()

  return (
    <aside aria-label="Shopping cart">
      {items.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button type="button" onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </aside>
  )
}
