import { useState } from "react"
import "./index.css"
import SponsoredCarousel from "./components/SponsoredCarousel"
import HotRestaurants from "./components/HotRestaurants"
import RestaurantModal from "./components/RestaurantModal"
import BottomNav from "./components/BottomNav"
import FindPlaceModal from "./components/FindPlaceModal"
import ReservationsModal from "./components/ReservationsModal"
import ProfileModal from "./components/ProfileModal"

export default function App() {
  const [recommendation, setRecommendation] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [isPaused, setIsPaused] = useState(false)
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

  // auto-scroll handled inside components (if desired)

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

      <SponsoredCarousel
        items={filteredSponsored}
        onOpen={openModal}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />

      <HotRestaurants items={filteredHot} onOpen={openModal} />

      <RestaurantModal
        restaurant={selectedRestaurant}
        onClose={closeModal}
        closing={closing}
      />

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />

      <ReservationsModal
        isOpen={showReservationsModal}
        onClose={() => setShowReservationsModal(false)}
        reservations={sampleReservations}
      />

      <FindPlaceModal
        isOpen={showFindModal}
        onClose={() => setShowFindModal(false)}
        findStep={findStep}
        setFindStep={setFindStep}
        formAnswers={formAnswers}
        setFormAnswers={setFormAnswers}
        hotRestaurants={hotRestaurants}
        sponsored={sponsored}
        recommendation={recommendation}
        setRecommendation={setRecommendation}
        onOpenRestaurant={openModal}
      />

      <BottomNav
        onProfile={() => setShowProfileModal(true)}
        onFind={handleMagicClick}
        onReservations={() => setShowReservationsModal(true)}
      />
    </div>
  )
}
