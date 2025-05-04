import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/navbar";
import { useParams } from "react-router-dom";
import { faHeart,faCartShopping } from "@fortawesome/free-solid-svg-icons";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
function ProductPage() {
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${backendUrl}/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          console.log("Backend URL:", `${backendUrl}/products/${id}`);
          throw new Error("Failed to fetch product data");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  // Calculate discounted price
  const discountedPrice = (
    product.price -
    (product.price * product.discount) / 100
  ).toFixed(2);

  return (
    <div className="h-full merriweather-regular">
      <Navbar></Navbar>
      <div className="bg-white text-black   h-full px-8 py-5 flex md:flex-row flex-col mx-auto ">
        <div className="md:w-3/5 w-full">
          {/* Left Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.productPageImages.map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-md w-full h-80"
              >
                <img
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Right Section  */}
        <div className="md:w-2/5 w-full bg-white p-6 shadow-lga rounded-lg mx-4 ">
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <div className="mt-4">
            <span className="text-xl font-bold text-blue-600">
              ${discountedPrice}
            </span>
            <span className="text-gray-500 line-through ml-2">
              ${product.price}
            </span>
            <span className="text-red-500 ml-2">{product.discount}% OFF</span>
          </div>
          

          <button className="mt-15 w-3/5 bg-white text-red-600 px-6 py-3 rounded-lg  shadow-lg outline-1 outline-gray-100 hover:bg-gray-100 transition">
            Buy Now
          </button>
          <div className="flex flex-row" >

          <button className="mt-6 w-1/3 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700  transition">
            Add To Cart
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        className=" inline-block mt-[3.5px] ml-3"
                        
                        />
          </button>
          <button className="mt-6 w-auto bg-white text-red-500 px-3 ml-5 py-3 rounded-lg shadow-md hover:bg-gray-50  transition flex ">
            Add To WishList
                      <FontAwesomeIcon
                        icon={faHeart}
                        className=" inline-block mt-[3.5px] ml-3"
                      />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
