import { useRef } from "react"

export default function SponsoredCarousel({
  items,
  onOpen,
  isPaused,
  setIsPaused,
}) {
  const trackRef = useRef(null)

  return (
    <div className="sponsored-rows">
      <h2 className="section-heading">Sponsored Suggestions</h2>
      <div className="carousel">
        <button
          className="carousel-btn prev-btn"
          onClick={() =>
            trackRef.current.scrollBy({ left: -250, behavior: "smooth" })
          }
        >
          ◀
        </button>
        <div
          className="carousel-track"
          ref={trackRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {items.map((r, i) => (
            <div
              key={i}
              className="card sponsored-card"
              onClick={() => onOpen(r)}
            >
              <div className="card-content">
                <p className="restaurant-name">{r.name}</p>
                <p className="restaurant-cuisine">{r.cuisine}</p>
                <span className="badge badge-sponsored">Sponsored</span>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-btn next-btn"
          onClick={() =>
            trackRef.current.scrollBy({ left: 250, behavior: "smooth" })
          }
        >
          ▶
        </button>
      </div>
    </div>
  )
}
