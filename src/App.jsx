import { useState, useEffect, useRef } from "react"
import "./index.css"

export default function App() {
  const [recommendation, setRecommendation] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef(null)
  const [closing, setClosing] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showReservationsModal, setShowReservationsModal] = useState(false)

  // New state for Find Me a Place modal
  const [showFindModal, setShowFindModal] = useState(false)
  const [findStep, setFindStep] = useState(0)

  // Add to your state for form answers
  const [formAnswers, setFormAnswers] = useState({
    foodPreference: "",
    atmosphere: [], // array to store selected atmosphere options
    // Step 3: price range (1=budget, 4=premium)
    priceRange: 2,
    // Step 4: allergies/diets
    diets: [],
    allergiesOther: "",
    // Step 5: distance & location
    distanceKm: 5,
    locationMode: "current", // 'current' | 'custom'
    customLocation: "",
  })

  // Handler for atmosphere checkboxes
  const handleAtmosphereChange = (option) => {
    setFormAnswers((prev) => {
      const exists = prev.atmosphere.includes(option)
      const newAtmosphere = exists
        ? prev.atmosphere.filter((o) => o !== option) // uncheck
        : [...prev.atmosphere, option] // check
      return { ...prev, atmosphere: newAtmosphere }
    })
  }

  // Handler for the first question input
  const handleFoodPreferenceChange = (e) => {
    setFormAnswers({ ...formAnswers, foodPreference: e.target.value })
  }

  // Handler to move to next form step
  const goToNextStep = () => {
    setFindStep(findStep + 1)
  }

  // Step 3: price range handler
  const handlePriceChange = (e) => {
    const value = Number(e.target.value)
    setFormAnswers((prev) => ({ ...prev, priceRange: value }))
  }

  // Step 4: diets/allergies handlers
  const toggleDiet = (option) => {
    setFormAnswers((prev) => {
      const exists = prev.diets.includes(option)
      const newDiets = exists
        ? prev.diets.filter((d) => d !== option)
        : [...prev.diets, option]
      return { ...prev, diets: newDiets }
    })
  }
  const handleAllergiesOtherChange = (e) => {
    setFormAnswers((prev) => ({ ...prev, allergiesOther: e.target.value }))
  }

  // Step 5: distance & location handlers
  const handleDistanceChange = (e) => {
    const value = Number(e.target.value)
    setFormAnswers((prev) => ({ ...prev, distanceKm: value }))
  }
  const handleLocationModeChange = (mode) => {
    setFormAnswers((prev) => ({ ...prev, locationMode: mode }))
  }
  const handleCustomLocationChange = (e) => {
    setFormAnswers((prev) => ({ ...prev, customLocation: e.target.value }))
  }

  // Finish action: close modal and optionally compute a recommendation
  const handleFinish = () => {
    // For now, pick a simple recommendation from hot restaurants
    const rec =
      hotRestaurants[Math.floor(Math.random() * hotRestaurants.length)]
    setRecommendation(rec)
    setShowFindModal(false)
  }

  const sponsored = [
    {
      name: "Ocean Grill",
      cuisine: "Seafood",
      sponsored: true,
      description: "Fresh seafood with ocean view.",
      menu: ["Grilled Salmon", "Lobster Bisque", "Shrimp Pasta"],
    },
    {
      name: "Pasta Palace",
      cuisine: "Italian",
      sponsored: true,
      description: "Authentic Italian pasta dishes.",
      menu: ["Spaghetti Carbonara", "Lasagna", "Fettuccine Alfredo"],
    },
    {
      name: "Sakura Sushi",
      cuisine: "Japanese",
      sponsored: true,
      description: "Sushi and Japanese delicacies.",
      menu: ["Sushi Platter", "Miso Soup", "Tempura"],
    },
    {
      name: "El Rancho",
      cuisine: "Mexican",
      sponsored: true,
      description: "Spicy and tasty Mexican cuisine.",
      menu: ["Tacos", "Burritos", "Guacamole"],
    },
    {
      name: "Curry House",
      cuisine: "Indian",
      sponsored: true,
      description: "Authentic Indian curries.",
      menu: ["Butter Chicken", "Paneer Masala", "Naan"],
    },
  ]

  const hotRestaurants = [
    {
      name: "Spicy Street",
      cuisine: "Indian",
      description: "Street-style Indian dishes.",
      menu: ["Chaat", "Biryani", "Samosa"],
    },
    {
      name: "Sushi Zen",
      cuisine: "Japanese",
      description: "Fresh sushi daily.",
      menu: ["Nigiri", "Sashimi", "Udon"],
    },
    {
      name: "Burger Barn",
      cuisine: "American",
      description: "Burgers with fresh ingredients.",
      menu: ["Cheeseburger", "Fries", "Milkshake"],
    },
    {
      name: "Taco Fiesta",
      cuisine: "Mexican",
      description: "Fun tacos and nachos.",
      menu: ["Tacos", "Nachos", "Quesadilla"],
    },
  ]

  const sampleReservations = [
    { restaurant: "Ocean Grill", date: "2025-10-01", time: "19:00", people: 2 },
    { restaurant: "Sushi Zen", date: "2025-10-05", time: "20:00", people: 3 },
  ]

  // Filter logic
  const filteredSponsored = sponsored.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredHot = hotRestaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // -------------------- Find Me a Place --------------------
  const handleMagicClick = () => {
    setShowFindModal(true)
    setFindStep(0)
  }

  const handleRecommendationClick = () => {
    const previousRestaurants = hotRestaurants.slice(0, 2) // example previous
    const allOptions = [...previousRestaurants, ...sponsored]
    const rec = allOptions[Math.floor(Math.random() * allOptions.length)]
    setRecommendation(rec)
    setShowFindModal(false)
  }

  // -------------------- Carousel auto-scroll --------------------
  useEffect(() => {
    const track = carouselRef.current
    if (!track) return
    const scrollStep = 250
    const interval = setInterval(() => {
      if (!isPaused) {
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth) {
          track.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          track.scrollBy({ left: scrollStep, behavior: "smooth" })
        }
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [isPaused])

  const openModal = (restaurant) => {
    setSelectedRestaurant(restaurant)
    setClosing(false)
  }
  const closeModal = () => {
    setClosing(true)
    setTimeout(() => setSelectedRestaurant(null), 300)
  }

  return (
    <div className="app-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search restaurants or cuisines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Sponsored Carousel */}
      <div className="sponsored-rows">
        <h2 className="section-heading">Sponsored Suggestions</h2>
        <div className="carousel">
          <button
            className="carousel-btn prev-btn"
            onClick={() =>
              carouselRef.current.scrollBy({ left: -250, behavior: "smooth" })
            }
          >
            ◀
          </button>
          <div
            className="carousel-track"
            ref={carouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {filteredSponsored.map((r, i) => (
              <div
                key={i}
                className="card sponsored-card"
                onClick={() => openModal(r)}
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
              carouselRef.current.scrollBy({ left: 250, behavior: "smooth" })
            }
          >
            ▶
          </button>
        </div>
      </div>

      {/* Hot Restaurants */}
      <div className="hot-restaurants">
        <h2 className="section-heading">Hot Restaurants</h2>
        <div className="hot-list">
          {filteredHot.length > 0 ? (
            filteredHot.map((r, i) => (
              <div
                key={i}
                className="card hot-card"
                onClick={() => openModal(r)}
              >
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

      {/* ---------- Restaurant Modal ---------- */}
      {selectedRestaurant && (
        <div
          className={`modal-overlay ${closing ? "fade-out" : ""}`}
          onClick={closeModal}
        >
          <div
            className={`modal-content ${closing ? "slide-down" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ✖
            </button>
            <h2>{selectedRestaurant.name}</h2>
            <p className="modal-cuisine">{selectedRestaurant.cuisine}</p>
            <p className="modal-description">
              {selectedRestaurant.description}
            </p>
            <h3>Menu</h3>
            <ul className="modal-menu">
              {selectedRestaurant.menu.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <button className="btn btn-primary modal-reserve">
              Make Reservation
            </button>
          </div>
        </div>
      )}

      {/* ---------- Profile Modal ---------- */}
      {showProfileModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowProfileModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowProfileModal(false)}
            >
              ✖
            </button>
            <h2>Your Profile</h2>
            <p>Name: John Doe</p>
            <p>Email: johndoe@example.com</p>
            <p>Member since: 2025</p>
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      )}

      {/* ---------- Reservations Modal ---------- */}
      {showReservationsModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowReservationsModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowReservationsModal(false)}
            >
              ✖
            </button>
            <h2>Your Reservations</h2>
            <ul className="reservation-list">
              {sampleReservations.map((res, idx) => (
                <li key={idx}>
                  <strong>{res.restaurant}</strong> - {res.date} at {res.time} (
                  {res.people} people)
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ---------- Find Me a Place Modal ---------- */}
      {showFindModal && (
        <div className="modal-overlay" onClick={() => setShowFindModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowFindModal(false)}
            >
              ✖
            </button>

            {/* Progress Bar */}
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width:
                    findStep === 0 ? "0%" : `${((findStep + 1) / 6) * 100}%`,
                }}
              ></div>
            </div>

            {/* Step 0: Choice between suggestion or form */}
            {findStep === 0 && (
              <div className="form-step">
                <h2>How do you want a recommendation?</h2>
                <div className="form-options">
                  {/* Suggestion button */}
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      // Pick random recommendation
                      const previousRestaurants = hotRestaurants.slice(0, 2)
                      const allOptions = [...previousRestaurants, ...sponsored]
                      const rec =
                        allOptions[
                          Math.floor(Math.random() * allOptions.length)
                        ]
                      setRecommendation(rec) // show suggestion
                    }}
                  >
                    Based on previous restaurants & sponsored suggestions
                  </button>

                  {/* Fill-in form button */}
                  <button
                    className="btn btn-secondary"
                    onClick={() => setFindStep(1)}
                  >
                    Fill in a form
                  </button>
                </div>

                {/* Show recommended restaurant (from suggestion button) */}
                {recommendation && (
                  <div
                    className="recommendation-box clickable"
                    onClick={() => {
                      openModal(recommendation)
                      setShowFindModal(false)
                    }}
                  >
                    <p className="recommend-title">{recommendation.name}</p>
                    <p className="recommend-cuisine">
                      {recommendation.cuisine}
                    </p>
                    <span className="badge badge-sponsored">Suggestion</span>
                    <p className="small-text">
                      Click to see details & make a reservation
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 1: First question of the form */}
            {findStep === 1 && (
              <div className="form-step">
                <h2>What do you want to eat?</h2>
                <input
                  type="text"
                  value={formAnswers.foodPreference}
                  onChange={(e) =>
                    setFormAnswers({
                      ...formAnswers,
                      foodPreference: e.target.value,
                    })
                  }
                  placeholder="e.g., Sushi, Pizza, Indian..."
                  className="form-input"
                />
                <button
                  className="btn btn-primary"
                  onClick={() => setFindStep(2)} // go to next question
                  disabled={!formAnswers.foodPreference.trim()}
                >
                  Next
                </button>
              </div>
            )}

            {/* Step 2: Atmosphere */}
            {findStep === 2 && (
              <div className="form-step">
                <h2>What kind of atmosphere do you prefer?</h2>
                <div className="checkbox-group">
                  {[
                    "Quiet",
                    "Busy",
                    "Family-friendly",
                    "Romantic",
                    "Casual",
                  ].map((option) => (
                    <label key={option} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formAnswers.atmosphere.includes(option)}
                        onChange={() => handleAtmosphereChange(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => setFindStep(3)} // next question
                  disabled={formAnswers.atmosphere.length === 0} // require at least one selection
                >
                  Next
                </button>
              </div>
            )}

            {findStep === 3 && (
              <div className="form-step">
                <h2>What price range are you looking for?</h2>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={formAnswers.priceRange}
                  onChange={handlePriceChange}
                />
                <div className="small-text">
                  Selected: {"$".repeat(formAnswers.priceRange)}
                </div>
                <div className="small-text">1 = Budget • 4 = Premium</div>
                <button
                  className="btn btn-primary"
                  onClick={() => setFindStep(4)}
                >
                  Next
                </button>
              </div>
            )}
            {findStep === 4 && (
              <div className="form-step">
                <h2>Allergies or diets to have in mind?</h2>
                <div className="checkbox-group">
                  {[
                    "Vegetarian",
                    "Vegan",
                    "Gluten-free",
                    "Nut allergy",
                    "Dairy-free",
                    "Halal",
                    "Kosher",
                  ].map((option) => (
                    <label key={option} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formAnswers.diets.includes(option)}
                        onChange={() => toggleDiet(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                <input
                  type="text"
                  value={formAnswers.allergiesOther}
                  onChange={handleAllergiesOtherChange}
                  placeholder="Other allergies/diets (optional)"
                  className="form-input"
                />
                <button
                  className="btn btn-primary"
                  onClick={() => setFindStep(5)}
                >
                  Next
                </button>
              </div>
            )}
            {findStep === 5 && (
              <div className="form-step">
                <h2>How far are you willing to travel?</h2>
                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="locationMode"
                      checked={formAnswers.locationMode === "current"}
                      onChange={() => handleLocationModeChange("current")}
                    />
                    Use my current location
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="locationMode"
                      checked={formAnswers.locationMode === "custom"}
                      onChange={() => handleLocationModeChange("custom")}
                    />
                    Choose a starting point
                  </label>
                </div>
                {formAnswers.locationMode === "custom" && (
                  <input
                    type="text"
                    value={formAnswers.customLocation}
                    onChange={handleCustomLocationChange}
                    placeholder="Enter address or area"
                    className="form-input"
                  />
                )}
                <label className="small-text">
                  Distance: {formAnswers.distanceKm} km
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={formAnswers.distanceKm}
                  onChange={handleDistanceChange}
                />
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setFindStep(4)}
                  >
                    Back
                  </button>
                  <button className="btn btn-primary" onClick={handleFinish}>
                    Finish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------- Bottom Navigation Bar ---------- */}
      <div className="bottom-nav">
        <button
          className="bottom-btn"
          onClick={() => setShowProfileModal(true)}
        >
          👤 Profile
        </button>
        <button
          className="bottom-btn bottom-btn-center"
          onClick={handleMagicClick}
        >
          ✨ Find Me a Place
        </button>
        <button
          className="bottom-btn"
          onClick={() => setShowReservationsModal(true)}
        >
          📅 Reservations
        </button>
      </div>
    </div>
  )
}
