import React, { useState, useEffect } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const EditProduct = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState(product);

  useEffect(() => {

    setFormData(product);
  }, [product]);

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddImage = (newImage) => {
    setFormData((prev) => ({
      ...prev,
      productPageImages: [...(prev.productPageImages || []), newImage],
    }));
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        `${backendUrl}/products/update/${product._id}`,
        formData
      );
      console.log('Product updated Successfully')
      onSave(res.data); 
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl mt-6 poppins-semibold ">
      <h2 className="text-2xl text-blue-700 font-semibold mb-8">Edit Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex w-full text-nowrap items-baseline gap-2">
          <p> Name :</p>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleFormChange("name", e.target.value)}
            className="border-1 border-gray-400 p-2 rounded-lg w-full placeholder:text-gray-600 text-gray-600 "
          />
        </div>
        <div className="flex w-full text-nowrap items-baseline gap-2">
          <p>Description :</p>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => handleFormChange("description", e.target.value)}
            className="border-1 border-gray-400 p-2 rounded-lg w-full placeholder:text-gray-600 text-gray-600"
          ></textarea>
        </div>
        <div className="flex w-full text-nowrap items-baseline gap-2">
          <p>BasePrice :</p>
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => handleFormChange("price", e.target.value)}
            className="border-1 border-gray-400 p-2 rounded-lg w-full placeholder:text-gray-600 text-gray-600"
          />
        </div>
        <div className="flex w-full text-nowrap items-baseline gap-2">
          <p>Discount :</p>
          <input
            type="number"
            placeholder="Discount (%)"
            value={formData.discount}
            onChange={(e) => handleFormChange("discount", e.target.value)}
            className="border-1 border-gray-400 p-2 rounded-lg w-full placeholder:text-gray-600 text-gray-600"
          />
        </div>
        <div className="flex w-full text-nowrap items-baseline gap-2">
          <p>Rating :</p>
          <input
            type="number"
            step="0.1"
            placeholder="Rating"
            value={formData.rating}
            onChange={(e) => handleFormChange("rating", e.target.value)}
            className="border-1 border-gray-400 p-2 rounded-lg w-full placeholder:text-gray-600 text-gray-600"
          />
        </div>
        <div className="flex w-full text-nowrap items-baseline gap-2">
          <p>Brand :</p>
          <input
            type="text"
            placeholder="Brand"
            value={formData.brand}
            onChange={(e) => handleFormChange("brand", e.target.value)}
            className="border-1 border-gray-400 p-2 rounded-lg w-full placeholder:text-gray-600 text-gray-600"
          />
        </div>
        <div className="flex w-full text-nowrap items-baseline gap-2">
          <p>Categories :</p>
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => handleFormChange("category", e.target.value)}
            className="border-1 border-gray-400 p-2 rounded-lg w-full placeholder:text-gray-600 text-gray-600"
          />
        </div>
        <div className="flex w-full text-nowrap items-baseline gap-2">
          <p>Thumbnail Image :</p>
          <input
            type="text"
            placeholder="Card Image URL"
            value={formData.cardImage}
            onChange={(e) => handleFormChange("cardImage", e.target.value)}
            className="border-1 border-gray-400 p-2 rounded-lg w-full placeholder:text-gray-600 text-gray-600"
          />
        </div>
        <div className="flex w-full text-nowrap items-baseline gap-2">
          <p>Stock :</p>
          <input
            type="number"
            placeholder="inventory"
            // To-do stock 
            value={formData.stock}
            onChange={(e) => handleFormChange("stock", e.target.value)}
            className="border-1 border-gray-400 p-2 rounded-lg w-full placeholder:text-gray-600 text-gray-600"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className=" mt-6 text-xl font-semibold text-blue-800 mb-2">Product Page Images:</p>
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
          className="border-1 border-gray-400 p-2 rounded-lg w-full placeholder:text-gray-600 text-gray-600"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
              handleAddImage(e.target.value.trim());
              e.target.value = "";
            }
          }}
        />
        <small className="text-gray-500">Press Enter to add new image</small>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
