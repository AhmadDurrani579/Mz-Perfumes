const countdown = [
  { value: '02', label: 'DAYS' },
  { value: '14', label: 'HRS' },
  { value: '35', label: 'MINS' },
  { value: '20', label: 'SECS' },
]

export default function TopSaleBar() {
  return (
    <aside className="top-sale-bar" aria-label="Summer sale announcement">
      <div className="top-sale-content">
        <div className="top-sale-message">
          <span className="top-sale-flame" aria-hidden="true">&#128293;</span>
          <strong>SUMMER SALE!</strong>
          <span>Up to <mark>50% OFF</mark> on Selected Perfumes</span>
        </div>

        <div className="top-sale-countdown" aria-label="Offer ends in 2 days, 14 hours, 35 minutes, and 20 seconds">
          <span className="top-sale-clock" aria-hidden="true" />
          <strong>Offer Ends In:</strong>
          <div className="top-sale-timer" aria-hidden="true">
            {countdown.map((item) => (
              <span className="top-sale-time" key={item.label}>
                <span>{item.value}</span>
                <small>{item.label}</small>
              </span>
            ))}
          </div>
        </div>

        <a className="top-sale-button" href="#collection">
          SHOP NOW <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </aside>
  )
}
