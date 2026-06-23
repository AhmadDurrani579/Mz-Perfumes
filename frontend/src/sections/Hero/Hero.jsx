import heroImage from '../../assets/images/perfume-hero.png'

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="hero-eyebrow">MAISON MZ — EST. RARE COMPOSITIONS</p>
        <h1 id="hero-title">Wear what <em className="hero-title-accent">lingers.</em></h1>
        <p className="hero-copy">
          Six fragrances, each poured from a single batch. No mass shelves, no rotating stock — only scents made to be remembered long after the room is empty.
        </p>
        <div className="hero-actions">
          <a className="hero-button hero-button-primary" href="#collection">Explore the collection</a>
          <a className="hero-button hero-button-secondary" href="#craft">Our craft</a>
        </div>
      </div>
      <div className="hero-media">
        <div className="hero-image-frame">
          <img src={heroImage} alt="A hand holding an MZ Zaryala perfume bottle" fetchPriority="high" />
        </div>
      </div>
    </section>
  )
}
