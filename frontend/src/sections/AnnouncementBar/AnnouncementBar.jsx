export default function AnnouncementBar() {
  return (
    <div className="announcement" role="note" aria-label="Current promotion">
      <span><strong>Mid-Season Exclusive</strong> — up to 27% off select fragrances</span>
      <span className="announcement-dot" aria-hidden="true">·</span>
      <span>Complimentary engraving on orders over £150</span>
      <a href="#collection">SHOP THE OFFER <span aria-hidden="true">→</span></a>
    </div>
  )
}
