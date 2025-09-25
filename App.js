import { useState } from "react";

export default function RestaurantApp() {
  const [recommendation, setRecommendation] = useState(null);

  const sponsored = [
    { name: "Ocean Grill", cuisine: "Seafood", sponsored: true },
    { name: "Pasta Palace", cuisine: "Italian", sponsored: true },
  ];

  const hotRestaurants = [
    { name: "Spicy Street", cuisine: "Indian" },
    { name: "Sushi Zen", cuisine: "Japanese" },
  ];

  const handleMagicClick = () => {
    const rec =
      hotRestaurants[Math.floor(Math.random() * hotRestaurants.length)];
    setRecommendation(rec);
  };

  return (
    <div className="p-6 space-y-10 max-w-4xl mx-auto">
      {/* Sponsored Row */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Sponsored Suggestions</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {sponsored.map((r, i) => (
            <div
              key={i}
              className="min-w-[220px] bg-white shadow-lg rounded-2xl border hover:scale-105 transition-transform"
            >
              <div className="p-4 space-y-2">
                <p className="font-semibold text-lg">{r.name}</p>
                <p className="text-sm text-gray-500">{r.cuisine}</p>
                <span className="text-xs bg-yellow-200 px-2 py-1 rounded-full font-medium">
                  Sponsored
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hot Restaurants */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Hot Restaurants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {hotRestaurants.map((r, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-2xl border hover:shadow-xl transition"
            >
              <div className="p-5">
                <p className="font-semibold text-lg">{r.name}</p>
                <p className="text-sm text-gray-500">{r.cuisine}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Magic Button */}
      <div className="text-center">
        <button
          onClick={handleMagicClick}
          className="px-8 py-3 rounded-2xl text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md hover:shadow-xl hover:scale-105 transition"
        >
          ✨ Find Me a Place
        </button>

        {recommendation && (
          <div className="mt-6 p-5 border rounded-2xl bg-green-50 shadow-inner">
            <p className="font-bold text-lg">
              We recommend: {recommendation.name}
            </p>
            <p className="text-sm text-gray-600">
              Cuisine: {recommendation.cuisine}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
