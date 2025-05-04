import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const ProductList = ({ products }) => {
  return (
    <div className="div3 flex flex-wrap justify-center gap-4 p-4 scroll-auto">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id || product.name} product={product} />
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
