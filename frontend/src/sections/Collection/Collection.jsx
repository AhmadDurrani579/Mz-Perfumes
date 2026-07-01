import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import fallbackProductImage from '../../assets/images/perfume-hero.png'
import { getBrands, getProducts } from '../../services/api.js'
import { mapBackendProduct } from '../../utils/productMapping.js'
import './Collection.css'

const allBrand = { id: 'all', name: 'All Brands' }




export default function Collection({ onViewProduct }) {
  const [brands, setBrands] = useState([])
  const [products, setProducts] = useState([])
  const [activeBrandId, setActiveBrandId] = useState(allBrand.id)
  const brandFilters = [allBrand, ...brands]
  const visibleProducts =
    activeBrandId === allBrand.id
      ? products
      : products.filter((product) => product.brandId === activeBrandId)

  useEffect(() => {
    let isMounted = true

    getBrands()
      .then((data) => {
        if (isMounted) setBrands(data)
      })
      .catch(() => {
        if (isMounted) setBrands([])
      })

    getProducts()
      .then((data) => {
        if (isMounted) setProducts(data.map((product) => mapBackendProduct(product, fallbackProductImage)))
      })
      .catch(() => {
        if (isMounted) setProducts([])
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
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onViewDetails={onViewProduct} />
          ))}
        </div>
      </div>
    </section>
  )
}
