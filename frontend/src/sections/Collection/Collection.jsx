import { useState } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import { products } from '../../data/products.js'
import { filterProducts } from '../../utils/productCollection.js'
import './Collection.css'

const houses = ['All Houses', ...products.map((product) => product.house)]

export default function Collection() {
  const [activeHouse, setActiveHouse] = useState('All Houses')
  const visibleProducts = filterProducts(products, activeHouse)

  return (
    <section id="collection" className="collection-section" aria-labelledby="collection-title">
      <div className="collection-section__inner">
        <header className="collection-section__header">
          <p className="collection-section__eyebrow">The collection</p>
          <h2 id="collection-title">Six houses. One shelf.</h2>
        </header>

        <div className="collection-filters" aria-label="Filter collection by house">
          {houses.map((house) => (
            <button
              key={house}
              type="button"
              className="collection-filter"
              aria-pressed={activeHouse === house}
              onClick={() => setActiveHouse(house)}
            >
              {house}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
