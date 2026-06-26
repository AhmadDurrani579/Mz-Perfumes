import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import { products } from '../../data/products.js'
import { getCategories } from '../../services/api.js'
import './Collection.css'

const allCategory = { id: 'all', name: 'All Categories' }

export default function Collection() {
  const [categories, setCategories] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState(allCategory.id)
  const categoryFilters = [allCategory, ...categories]

  useEffect(() => {
    let isMounted = true

    getCategories()
      .then((data) => {
        if (isMounted) setCategories(data)
      })
      .catch(() => {
        if (isMounted) setCategories([])
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

        <div className="collection-filters" aria-label="Filter collection by category">
          {categoryFilters.map((category) => (
            <button
              key={category.id}
              type="button"
              className="collection-filter"
              aria-pressed={activeCategoryId === category.id}
              onClick={() => setActiveCategoryId(category.id)}
            >
              {category.name}
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
