export default function HotRestaurants({ items, onOpen }) {
  return (
    <div className="hot-restaurants">
      <h2 className="section-heading">Hot Restaurants</h2>
      <div className="hot-list">
        {items.length > 0 ? (
          items.map((r, i) => (
            <div key={i} className="card hot-card" onClick={() => onOpen(r)}>
              <div className="card-content">
                <p className="restaurant-name">{r.name}</p>
                <p className="restaurant-cuisine">{r.cuisine}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No hot restaurants match your search.</p>
        )}
      </div>
    </div>
  )
}
