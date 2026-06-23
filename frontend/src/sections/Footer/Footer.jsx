import './Footer.css'

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <a className="footer-brand" href="#top" aria-label="MZ Perfumes home">
            <span className="footer-brand-mark" aria-hidden="true">MZ</span>
            <span className="footer-brand-name">Perfumes</span>
          </a>

          <p className="site-footer__message">
            Questions before you order? Message us directly on WhatsApp from any product card — a real person replies, not a bot.
          </p>
        </div>

        <div className="site-footer__bottom">
          <p>© 2026 MZ Perfumes. All rights reserved.</p>
          <p>Reading, United Kingdom</p>
        </div>
      </div>
    </footer>
  )
}
