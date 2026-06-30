import { useEffect, useState } from 'react'
import { useCart } from '../../hooks/useCart.js'
import TopSaleBar from '../../sections/TopSaleBar/TopSaleBar.jsx'
import { isHeaderScrolled } from '../../utils/headerScroll.js'

export default function Header() {
  const { items } = useCart()
  const [isScrolled, setIsScrolled] = useState(() => isHeaderScrolled(window.scrollY))

  useEffect(() => {
    const handleScroll = () => setIsScrolled(isHeaderScrolled(window.scrollY))

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="MZ Perfumse home">
        <span className="brand-mark" aria-hidden="true">MZ</span>
        <span className="brand-name">Perfumes</span>
      </a>
      <div className="site-header__nav">
        <nav className="primary-nav" aria-label="Primary navigation">
          <a href="#collection">Collection</a>
          <a href="#craft">House</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      <div className="site-header__offer">
        <TopSaleBar />
      </div>
      <button className="cart-button" type="button" aria-label="Open shopping cart">
        <svg className="cart-icon" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M3.5 5.5h3l2.2 13.2h14.7l2.7-9.2H8" />
          <path d="M11.5 23.5a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0Zm13 0a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0Z" />
        </svg>
        <span className="cart-count" aria-label={`${items.length} items`}>{items.length}</span>
      </button>
    </header>
  )
}
