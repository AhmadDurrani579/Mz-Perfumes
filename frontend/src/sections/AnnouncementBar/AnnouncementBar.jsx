import promotionImage from '../../assets/images/image.png'

export default function AnnouncementBar() {
  return (
    <div className="announcement" role="note" aria-label="Summer sale promotion">
      <div className="announcement-content">
        <p className="announcement-eyebrow">MZ ESSENCE</p>
        <p className="announcement-title">SUMMER <span>SALE</span></p>
        <p className="announcement-offer">UP TO <strong>50% OFF</strong></p>
        <p className="announcement-copy">ON SELECTED LUXURY PERFUMES</p>
        <div className="announcement-rule" aria-hidden="true"><span /></div>
        <div className="announcement-perks" aria-label="Promotion benefits">
          <span><i aria-hidden="true" />Premium<br />quality</span>
          <span><i aria-hidden="true" />Free<br />shipping</span>
          <span><i aria-hidden="true" />100%<br />authentic</span>
          <span><i aria-hidden="true" />Easy<br />returns</span>
        </div>
        <a className="announcement-button" href="#collection">SHOP NOW <span aria-hidden="true">-&gt;</span></a>
      </div>
      <div className="announcement-media" aria-hidden="true">
        <img src={promotionImage} alt="" />
      </div>
    </div>
  )
}
