export default function ReservationsModal({ isOpen, onClose, reservations }) {
  if (!isOpen) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <h2>Your Reservations</h2>
        <ul className="reservation-list">
          {reservations.map((res, idx) => (
            <li key={idx}>
              <strong>{res.restaurant}</strong> - {res.date} at {res.time} (
              {res.people} people)
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
