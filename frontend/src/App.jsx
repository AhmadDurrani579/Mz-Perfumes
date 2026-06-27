import Header from './components/Header/Header.jsx'
import TopSaleBar from './sections/TopSaleBar/TopSaleBar.jsx'
import AnnouncementBar from './sections/AnnouncementBar/AnnouncementBar.jsx'
import Hero from './sections/Hero/Hero.jsx'
import Collection from './sections/Collection/Collection.jsx'
import Craft from './sections/Craft/Craft.jsx'
import Footer from './sections/Footer/Footer.jsx'

export default function App() {
  return (
    <>
      <TopSaleBar />
      <Header />
      <main>
        <AnnouncementBar />
        <Hero />
        <Collection />
        <Craft />
      </main>
      <Footer />
    </>
  )
}
