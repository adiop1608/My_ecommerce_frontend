import React from 'react';

const ProductForm = ({
  formData,
  handleFormChange,
  handleAddImage,
  handleSave,
  handleCancel,
  isAdding,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">
        {isAdding ? "Add New Product" : "Edit Product"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleFormChange("name", e.target.value)}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <textarea
          value={formData.description}
          onChange={(e) => handleFormChange("description", e.target.value)}
          placeholder="Description"
          className="w-full border p-2 rounded"
        ></textarea>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => handleFormChange("price", e.target.value)}
          placeholder="Price"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          value={formData.discount}
          onChange={(e) => handleFormChange("discount", e.target.value)}
          placeholder="Discount (%)"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          step="0.1"
          value={formData.rating}
          onChange={(e) => handleFormChange("rating", e.target.value)}
          placeholder="Rating"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={formData.brand}
          onChange={(e) => handleFormChange("brand", e.target.value)}
          placeholder="Brand"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={formData.category}
          onChange={(e) => handleFormChange("category", e.target.value)}
          placeholder="Category"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={formData.cardImage}
          onChange={(e) => handleFormChange("cardImage", e.target.value)}
          placeholder="Card Image URL"
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mt-4">
        <p className="font-semibold mb-2">Product Page Images:</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {formData.productPageImages?.map((img, idx) => (
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
          className="border p-2 rounded w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim() !== "") {
              handleAddImage(e.target.value.trim());
              e.target.value = "";
            }
          }}
        />
        <small className="text-gray-500">Press Enter to add new image</small>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
