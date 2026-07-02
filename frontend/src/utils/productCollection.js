const WHATSAPP_NUMBER = '923715669424'

export function filterProducts(products, activeHouse) {
  if (activeHouse === 'All Houses') return products

  return products.filter((product) => product.house === activeHouse)
}

export function createWhatsAppUrl(productName) {
  const message = `Hi, I would like to enquire about ${productName}.`

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function createOrderWhatsAppUrl({ customer, items, item, total }) {
  const orderItems = items ?? (item ? [item] : [])
  const itemLines = orderItems.flatMap((orderItem, index) => [
    `${index + 1}. ${orderItem.name}`,
    `Size: ${orderItem.size}`,
    `Quantity: ${orderItem.quantity}`,
    `Price: ${orderItem.price}`,
    `Subtotal: ${orderItem.price * orderItem.quantity}`,
  ])
  const lines = [
    'Hi, I would like to place this order.',
    `Customer: ${customer.customer_name}`,
    `Phone: ${customer.customer_phone}`,
    customer.customer_email ? `Email: ${customer.customer_email}` : '',
    customer.city ? `City: ${customer.city}` : '',
    customer.address ? `Address: ${customer.address}` : '',
    ...itemLines,
    `Grand Total: ${total}`,
    customer.notes ? `Notes: ${customer.notes}` : '',
  ].filter(Boolean)

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
}
