const WHATSAPP_NUMBER = '923715669424'

export function filterProducts(products, activeHouse) {
  if (activeHouse === 'All Houses') return products

  return products.filter((product) => product.house === activeHouse)
}

export function createWhatsAppUrl(productName) {
  const message = `Hi, I would like to enquire about ${productName}.`

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
