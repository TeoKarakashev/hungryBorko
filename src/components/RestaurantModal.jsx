export default function RestaurantModal({ restaurant, onClose, closing }) {
  if (!restaurant) return null
  return (
    <div className={`modal-overlay ${closing ? "fade-out" : ""}`} onClick={onClose}>
      <div className={`modal-content ${closing ? "slide-down" : ""}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <h2>{restaurant.name}</h2>
        <p className="modal-cuisine">{restaurant.cuisine}</p>
        <p className="modal-description">{restaurant.description}</p>
        <h3>Menu</h3>
        <ul className="modal-menu">
          {restaurant.menu.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <button className="btn btn-primary modal-reserve">Make Reservation</button>
      </div>
    </div>
  )
}
