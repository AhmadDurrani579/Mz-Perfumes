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

  return (
    <>
      <Header />
      <main>
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
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
