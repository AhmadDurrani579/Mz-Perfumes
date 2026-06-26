import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import { products } from '../../data/products.js'
import { getBrands } from '../../services/api.js'
import './Collection.css'

const allBrand = { id: 'all', name: 'All Brands' }

export default function Collection() {
  const [brands, setBrands] = useState([])
  const [activeBrandId, setActiveBrandId] = useState(allBrand.id)
  const brandFilters = [allBrand, ...brands]

  useEffect(() => {
    let isMounted = true

    getBrands()
      .then((data) => {
        if (isMounted) setBrands(data)
      })
      .catch(() => {
        if (isMounted) setBrands([])
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section id="collection" className="collection-section" aria-labelledby="collection-title">
      <div className="collection-section__inner">
        <header className="collection-section__header">
          <p className="collection-section__eyebrow">The collection</p>
          <h2 id="collection-title">Six houses. One shelf.</h2>
        </header>

        <div className="collection-filters" aria-label="Filter collection by brand">
          {brandFilters.map((brand) => (
            <button
              key={brand.id}
              type="button"
              className="collection-filter"
              aria-pressed={activeBrandId === brand.id}
              onClick={() => setActiveBrandId(brand.id)}
            >
              {brand.name}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
