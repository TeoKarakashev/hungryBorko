export default function BottomNav({ onProfile, onFind, onReservations }) {
  return (
    <div className="bottom-nav">
      <button className="bottom-btn" onClick={onProfile}>
        👤 Profile
      </button>
      <button className="bottom-btn bottom-btn-center" onClick={onFind}>
        ✨ Find Me a Place
      </button>
      <button className="bottom-btn" onClick={onReservations}>
        📅 Reservations
      </button>
    </div>
  )
}
