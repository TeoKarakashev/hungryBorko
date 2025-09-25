export default function FindPlaceModal({
  isOpen,
  onClose,
  findStep,
  setFindStep,
  formAnswers,
  setFormAnswers,
  hotRestaurants,
  sponsored,
  recommendation,
  setRecommendation,
  onOpenRestaurant,
}) {
  if (!isOpen) return null

  const handleAtmosphereChange = (option) => {
    setFormAnswers((prev) => {
      const exists = prev.atmosphere.includes(option)
      const newAtmosphere = exists
        ? prev.atmosphere.filter((o) => o !== option)
        : [...prev.atmosphere, option]
      return { ...prev, atmosphere: newAtmosphere }
    })
  }

  const handlePriceChange = (e) => {
    const value = Number(e.target.value)
    setFormAnswers((prev) => ({ ...prev, priceRange: value }))
  }

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

  const handleFinish = () => {
    const rec = hotRestaurants[Math.floor(Math.random() * hotRestaurants.length)]
    setRecommendation(rec)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: findStep === 0 ? "0%" : `${((findStep + 1) / 5) * 100}%`,
            }}
          ></div>
        </div>

        {/* Step 0 */}
        {findStep === 0 && (
          <div className="form-step">
            <h2>How do you want a recommendation?</h2>
            <div className="form-options">
              <button
                className="btn btn-primary"
                onClick={() => {
                  const previousRestaurants = hotRestaurants.slice(0, 2)
                  const allOptions = [...previousRestaurants, ...sponsored]
                  const rec =
                    allOptions[Math.floor(Math.random() * allOptions.length)]
                  setRecommendation(rec)
                }}
              >
                Based on previous restaurants & sponsored suggestions
              </button>
              <button className="btn btn-secondary" onClick={() => setFindStep(1)}>
                Fill in a form
              </button>
            </div>

            {recommendation && (
              <div
                className="recommendation-box clickable"
                onClick={() => {
                  onOpenRestaurant(recommendation)
                  onClose()
                }}
              >
                <p className="recommend-title">{recommendation.name}</p>
                <p className="recommend-cuisine">{recommendation.cuisine}</p>
                <span className="badge badge-sponsored">Suggestion</span>
                <p className="small-text">Click to see details & make a reservation</p>
              </div>
            )}
          </div>
        )}

        {/* Step 1 */}
        {findStep === 1 && (
          <div className="form-step">
            <h2>What do you want to eat?</h2>
            <input
              type="text"
              value={formAnswers.foodPreference}
              onChange={(e) =>
                setFormAnswers({ ...formAnswers, foodPreference: e.target.value })
              }
              placeholder="e.g., Sushi, Pizza, Indian..."
              className="form-input"
            />
            <button
              className="btn btn-primary"
              onClick={() => setFindStep(2)}
              disabled={!formAnswers.foodPreference.trim()}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2 */}
        {findStep === 2 && (
          <div className="form-step">
            <h2>What kind of atmosphere do you prefer?</h2>
            <div className="checkbox-group">
              {["Quiet", "Busy", "Family-friendly", "Romantic", "Casual"].map(
                (option) => (
                  <label key={option} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formAnswers.atmosphere.includes(option)}
                      onChange={() => handleAtmosphereChange(option)}
                    />
                    {option}
                  </label>
                )
              )}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setFindStep(3)}
              disabled={formAnswers.atmosphere.length === 0}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 3 */}
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
            <div className="small-text">Selected: {"$".repeat(formAnswers.priceRange)}</div>
            <div className="small-text">1 = Budget • 4 = Premium</div>
            <button className="btn btn-primary" onClick={() => setFindStep(4)}>
              Next
            </button>
          </div>
        )}

        {/* Step 4 */}
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
            <button className="btn btn-primary" onClick={() => setFindStep(5)}>
              Next
            </button>
          </div>
        )}

        {/* Step 5 */}
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
            <label className="small-text">Distance: {formAnswers.distanceKm} km</label>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={formAnswers.distanceKm}
              onChange={handleDistanceChange}
            />
            <div style={{ display: "flex", gap: "8px" }}>
              <button className="btn btn-secondary" onClick={() => setFindStep(4)}>
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
  )
}
