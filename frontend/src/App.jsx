import { useState } from 'react'
import Cart from './components/Cart/Cart.jsx'
import Header from './components/Header/Header.jsx'
import ProductDetail from './components/ProductDetail/ProductDetail.jsx'
import AnnouncementBar from './sections/AnnouncementBar/AnnouncementBar.jsx'
import Hero from './sections/Hero/Hero.jsx'
import Collection from './sections/Collection/Collection.jsx'
import Craft from './sections/Craft/Craft.jsx'
import Footer from './sections/Footer/Footer.jsx'

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const handleCollectionNavigation = (event) => {
    event.preventDefault()
    setSelectedProduct(null)
    window.requestAnimationFrame(() => {
      document.getElementById('collection')?.scrollIntoView()
      window.history.replaceState(null, '', '#collection')
    })
  }

  return (
    <>
      <Header
        onCollectionClick={handleCollectionNavigation}
        onCartClick={() => setIsCartOpen(true)}
      />
      <main>
        {selectedProduct ? (
          <ProductDetail key={selectedProduct.id} product={selectedProduct} />
        ) : (
          <>
            <AnnouncementBar />
            <Hero />
            <Collection onViewProduct={setSelectedProduct} />
            <Craft />
          </>
        )}
      </main>
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
      <Footer />
    </>
  )
}
