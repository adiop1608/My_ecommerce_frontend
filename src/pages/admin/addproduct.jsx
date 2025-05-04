

import React, { useState } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddProduct = ({onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    rating: "",
    brand: "",
    category: "",
    cardImage: "",
    stock: "",
    productPageImages: [],
  });

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddImage = (newImage) => {
    setFormData((prev) => ({
      ...prev,
      productPageImages: [...(prev.productPageImages || []), newImage],
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${backendUrl}/products`, formData);
      if(response.data){
        onAdd(response.data);
      }
      setFormData({
        name: "",
        description: "",
        price: "",
        discount: "",
        rating: "",
        brand: "",
        category: "",
        cardImage: "",
        stock: "",
        productPageImages: [],
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6 poppins-semibold">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Add Product</h2>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* All input fields remain same */}
        {[
          "name",
          "description",
          "price",
          "discount",
          "rating",
          "brand",
          "category",
          "cardImage",
          "stock",
        ].map((field) => (
          <input
            key={field}
            type={field === "description" ? "textarea" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={(e) => handleFormChange(field, e.target.value)}
            className="border border-gray-400 p-2 rounded-lg w-full placeholder:text-gray-600 text-gray-600"
          />
        ))}
      </div>

      {/* Product Page Images */}
      <div className="mt-4">
        <p className="mt-6 text-xl font-semibold text-blue-800 mb-2">
          Product Page Images:
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {formData.productPageImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Product Page ${idx}`}
              className="h-16 w-16 object-cover rounded"
            />
          ))}
        </div>
        <input
          type="text"
          placeholder="New Image URL"
          className="border border-gray-400 p-2 rounded-lg w-full placeholder:text-gray-600 text-gray-600"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
              handleAddImage(e.target.value.trim());
              e.target.value = "";
            }
          }}
        />
        <small className="text-gray-500">Press Enter to add new image</small>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl"
        >
          Add
        </button>
        <button
          onClick={onCancel}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProduct;

