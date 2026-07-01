import { useState } from 'react'
import Header from './components/Header/Header.jsx'
import ProductDetail from './components/ProductDetail/ProductDetail.jsx'
import AnnouncementBar from './sections/AnnouncementBar/AnnouncementBar.jsx'
import Hero from './sections/Hero/Hero.jsx'
import Collection from './sections/Collection/Collection.jsx'
import Craft from './sections/Craft/Craft.jsx'
import Footer from './sections/Footer/Footer.jsx'

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
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
      <Header onCollectionClick={handleCollectionNavigation} />
      <main>
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} />
        ) : (
          <>
            <AnnouncementBar />
            <Hero />
            <Collection onViewProduct={setSelectedProduct} />
            <Craft />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
