import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // 👈 Add this import
import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const ProductCard = ({ product }) => {
  const discountedPrice = (
    product.price -
    (product.price * product.discount) / 100
  ).toFixed(2);

  const token = localStorage.getItem('authToken')
  console.log(token)
const addToCart = async (product) => {
  try {

    const res = await axios.post(
      `${backendUrl}/cart/add`,
      {
        productId: product._id,
        name: product.name,
        price: product.price,
        cardImage: product.cardImage,
        discount:product.discount // Adjust this according to your model
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }
      }
    )
    alert('Added to cart!')
  } catch (error) {
    console.error('Add to cart error:', error)
    alert('Failed to add to cart')
  }
}

  return (
    <div className="  group bg-white text-black merriweather-regular w-66 p-4 m-0 h-120 rounded-xl shadow-md border-2 border-gray-100">
        <Link to={`/product/${product._id}`} className="no-underline"> {/* 👈 Wrap the card */}
        <div className="overflow-hidden">

        <img
          src={product.cardImage}
          alt={product.name}
          className="h-56 w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 rounded-lg"
          />
          </div>
        <h3 className="flex flex-wrap justify-evenly mt-2">{product.name}</h3>
        <p className="flex justify-evenly mt-2 text-gray-400 text-sm">
          {product.description}
        </p>
        <div className="mt-2">
          <span className="text-red-500 text-sm">
            Rating : {product.rating}
            <FontAwesomeIcon icon={faStar} className="hidden ml-1 mr-4" />
          </span>
          <span className="text-red-500 text-sm">
            Discount : {product.discount}%
          </span>
        </div>
        <div className="flex justify-evenly items-center mt-3 mb-1">
          <div>
            <span className="text-xl font-bold text-blue-600">
              ${discountedPrice}
            </span>
            <span className="text-gray-500 line-through text-sm ml-2">
              ${product.price}
            </span>
          </div>
        </div>
    </Link>
        <div className="flex justify-between mt-3 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="cursor-pointer bg-white text-black px-4 py-2 shadow-sm shadow-red-500 rounded-lg hover:bg-red-600 hover:text-white">
            Buy Now
          </button>
          <button  onClick={() => addToCart(product)} className="bg-white text-black px-4 py-2 rounded-lg shadow-sm shadow-blue-400 text-sm hover:bg-blue-600 hover:text-white transition">
            Add to Cart
            <FontAwesomeIcon icon={faBagShopping} className="ml-[5px]" />
          </button>
        </div>
      </div>
  );
};

export default ProductCard;
