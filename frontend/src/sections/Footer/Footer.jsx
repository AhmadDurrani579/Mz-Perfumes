import './Footer.css'

const socialLinks = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/923715669424',
    icon: (
      <path d="M12 2a9.8 9.8 0 0 0-8.5 14.7L2.3 21.6l5-1.2A9.8 9.8 0 1 0 12 2Zm0 1.9a7.9 7.9 0 0 1 0 15.8c-1.3 0-2.6-.3-3.7-.9l-.3-.2-2.8.7.7-2.7-.2-.3A7.9 7.9 0 0 1 12 3.9Zm-3.3 3.9c-.2 0-.5.1-.7.3-.4.4-.9 1.1-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.4l-1.7-.8c-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2.1-.3 0-.5l-.8-1.8c-.2-.3-.4-.3-.6-.3h-.7Z" />
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/mzess_ence7?utm_source=qr&igsh=ZmNoZ3Brc3U3c2s2',
    icon: (
      <path d="M8 2h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6Zm0 2a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H8Zm4 3.4A4.6 4.6 0 1 1 12 16.6 4.6 4.6 0 0 1 12 7.4Zm0 2A2.6 2.6 0 1 0 12 14.6 2.6 2.6 0 0 0 12 9.4Zm5.1-2.8a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@mzessence7?_r=1&_t=ZN-97au2VED08E',
    icon: (
      <path d="M15.6 2c.3 2.3 1.6 3.7 3.9 3.9v3.4a7.5 7.5 0 0 1-3.8-1.1v6.8a6.8 6.8 0 1 1-6.8-6.8c.4 0 .8 0 1.2.1v3.6a3.2 3.2 0 1 0 2.1 3V2h3.4Z" />
    ),
  },
]

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
          <div className="footer-social" aria-label="MZ Perfumes social media">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                className="footer-social__link"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open MZ Perfumes ${link.name}`}
                title={link.name}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                  {link.icon}
                </svg>
              </a>
            ))}
          </div>
          <p>Reading, United Kingdom</p>
        </div>
      </div>
    </footer>
  )
}
