import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar({ onFilter,onReset }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await axios.get(`${backendUrl}/products`);
        const products = res.data;

        const uniqueCategories = [...new Set(products.map((p) => p.category))];
        const uniqueBrands = [...new Set(products.map((p) => p.brand))];

        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      } catch (err) {
        console.error("Failed to fetch initial filter data:", err);
      }
    };

    fetchInitialData();
  }, []);
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        let query = "";
        if (selectedCategory) query += `category=${encodeURIComponent(selectedCategory)}&`;
        if (selectedBrand) query += `brand=${encodeURIComponent(selectedBrand)}&`;

        const res = await axios.get(`${backendUrl}/products/filter?${query}`);
        if (onFilter) onFilter(res.data);
      } catch (err) {
        console.error("Failed to fetch filtered products:", err);
      }
    };

    fetchFilteredProducts();
  }, [selectedCategory, selectedBrand]);
  const handleCategoryReset = () => {
    setSelectedCategory(null)
    onReset(); 
  };
  const handleBrandReset = () => {
    setSelectedBrand(null)
    onReset(); 
  };

  return (
    <aside className="lg:w-1/7 w-1/3 min-h-screen bg-white p-4 shadow-md mt-4 rounded-xl flex flex-col">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        <button
          onClick={handleCategoryReset}
          className="text-sm text-blue-600 cursor-pointer hover:text-red-600"
        >
          Reset
        </button>
      </div>

      <ul>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() =>
              setSelectedCategory(category === selectedCategory ? null : category)
            }
            className={`flex items-center gap-2 p-2 cursor-pointer rounded-md text-gray-600 hover:bg-gray-200 ${
              selectedCategory === category ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                selectedCategory === category ? "bg-blue-600 border-blue-600" : "border-gray-400"
              }`}
            >
              {selectedCategory === category && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            {category}
          </li>
        ))}
      </ul>

      {/* Brand Header */}
      <div className="flex items-center justify-between mt-6 mb-4">
        <h2 className="text-lg font-semibold">Brand</h2>
        <button
          onClick={handleBrandReset}
          className="text-sm text-blue-600 cursor-pointer hover:text-red-600"
        >
          Reset
        </button>
      </div>

      <ul>
        {brands.map((brand) => (
          <li
            key={brand}
            onClick={() =>
              setSelectedBrand(brand === selectedBrand ? null : brand)
            }
            className={`flex items-center gap-2 p-2 cursor-pointer rounded-md text-gray-600 hover:bg-gray-200 ${
              selectedBrand === brand ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                selectedBrand === brand ? "bg-blue-600 border-blue-600" : "border-gray-400"
              }`}
            >
              {selectedBrand === brand && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            {brand}
          </li>
        ))}
      </ul>
    </aside>
  );
}
