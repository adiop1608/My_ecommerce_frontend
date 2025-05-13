import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Myorders() {
  const token = localStorage.getItem("authToken");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus , setSelectedStatus] = useState("All");
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/order/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);
  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => {
          return order.orderStatus === selectedStatus;
        });
  return (
    <div className="p-4 poppins-regular">
      <div className="flex items-center justify-between p-4">
        <p className="merriweather-regular font-medium text-3xl">My Orders</p>
        <div className="flex flex-row items-center cursor-pointer">
          <img
            className="size-[50px] rounded-full"
            src={"../src/assets/logo.png"}
            alt="logo"
          />
          <Link to='/dashboard'>
          <p className="ml-2 hover:text-blue-500 hover:underline cursor-pointer">
            ShopSphere
          </p>
          </Link>
        </div>
      </div>

      <div className="flex ml-4 items-center justify-between mb-8 ">
        <div className="flex gap-x-4 ">
          {["All", "Processing", "Shipped","Delivered", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={()=>setSelectedStatus(status)}
              className="rounded-3xl border cursor-pointer text-gray-900 border-gray-400 hover:text-red-600 hover:border-red-500 px-4 py-1 "
            >
              {status}
            </button>
          ))}
        </div>
        <div>{/* TODO: Add date range filter */}</div>
      </div>

      {loading ? (
        <p className="ml-4 text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="ml-4 text-gray-500">No orders found.</p>
      ) : (
                filteredOrders.map((order, index) => (
          <div
            key={index}
            className="border rounded-xl ml-4 p-4 mb-4 border-gray-200 poppins-regular"
            style={{
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)"
}}
          >
            <div className="flex gap-2 items-center mb-2 ">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  order.orderStatus === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.orderStatus === "Shipped"
                    ? "bg-blue-100 text-blue-700"
                    : order.orderStatus === "Processing"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.orderStatus === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faCircle} className="size-2 mr-1" />
                {order.orderStatus}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  order.paymentStatus === "Paid"
                    ? "bg-green-100 text-green-700"
                    : order.paymentStatus === "Pending"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faCircle} className="size-2 mr-1" />
                {order.paymentStatus}
              </span>
              <span className="text-gray-600 text-sm">
                | {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="mt-4 mb-4">
              <p className="text-red-900 font-bold">Order ID: {order._id}</p>
            </div>

            {order.products.map((product, i) => (
              <div
                key={i}
                className="flex items-center gap-4 mb-4 border-b border-gray-200 pb-2 mt-4 text-lg"
              >
                <img
                  src={product.cardImage}
                  alt={product.name}
                  className="w-30 h-30 object-cover rounded-2xl"
                />
                <div className="text-gray-700 ml-6">
                  <div className="flex">
                    <p className="text-gray-900 font-semibold">
                      {product.name}{" "}
                    </p>
                    <p className="text-gray-500 ml-2">
                      {" "}
                      | {product.description}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div>
                      <p>Qty: {product.quantity}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="flex gap-2">
                        Base Price:{" "}
                        <p className="line-through text-red-500">${product.price} </p>
                      </span>
                      {product.discount > 0 && (
                        <span className="text-green-600">
                          (-{product.discount}%)
                        </span>
                      )}
                    </div>
                    <div>
                                            <p className="flex" >
                        {" "}
                        Price: $
                        <p className="text-red-600">

                        {(
                          product.price -
                          (product.price * product.discount) / 100
                        ).toFixed(2)}
                        </p>
                      </p>
                    </div>
                  </div>
                    <p className="mb-4"></p>
                </div>
              </div>
            ))}
            <div className="text-sm text-gray-600 mt-2">
              <p className="text-lg">
                <span className="text-indigo-500 font-semibold">Payment :</span> {order.paymentMethod}
              </p>
              <p className="text-xl flex">
                <p className="text-indigo-500 font-semibold">Total :  </p> 
               <span className="ml-1">
                  ${(order.subtotal - (order.totalDiscount || 0)).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Myorders;
