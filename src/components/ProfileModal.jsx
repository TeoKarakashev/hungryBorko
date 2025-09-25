export default function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <h2>Your Profile</h2>
        <p>Name: John Doe</p>
        <p>Email: johndoe@example.com</p>
        <p>Member since: 2025</p>
        <button className="btn btn-primary">Edit Profile</button>
      </div>
    </div>
  )
}
