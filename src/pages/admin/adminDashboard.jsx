import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  faBoxesPacking,
  faCubes,
  faGaugeHigh,
  faUsers,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import OverviewCard from "../../components/overviewcards";
import SalesGraph from "./salesGraph";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    users: 0,
    products: 0,
    orders: 0,
  });
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const [userRes, productRes, orderRes,topProductRes] = await Promise.all([
          axios.get(`${backendUrl}/auth/count`,{
            headers:{
              Authorization:`Bearer ${token}`,
            }
          }),
          axios.get(`${backendUrl}/products/count`),
          axios.get(`${backendUrl}/order/count`,{
            headers:{
              Authorization:`Bearer ${token}`,
            }
          }),
          axios.get(`${backendUrl}/order/topsell`,{
            headers:{
              Authorization:`Bearer ${token}`,
            }
          }),
        ]);

  
        setCounts({
          users: userRes.data.totalUsers,    // Check if count exists here
          products: productRes.data.totalproducts,
          orders: orderRes.data.totalOrders,
        });

        setTopProducts(topProductRes.data)
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchDashboardData();
  }, []);



  return (
    <div className="p-4 w-full">
      <div className="merriweather-regular">
        <h1 className="text-2xl font-bold mb-4  ">Dashboard Overview</h1>
      </div>

      {/* Overview Cards */}
      <div className="  flex md:flex-row flex-col  sm:ml-8 sm:px-4  ">
        <OverviewCard title="Users" count={counts.users} Icon={faUsers} />
        <OverviewCard title="Product" count={counts.products}  Icon={faBoxesPacking} />
        <OverviewCard title="Orders" count={counts.orders}  Icon={faCubes} />
      </div>

      {/* Sales Graph (Placeholder) */}
      <div className=" sm:flex-row flex flex-col justify-between ">
        <div className=" w-full bg-white p-6 mb-8 rounded shadow merriweather-regular">
          <h2 className="text-xl font-semibold mb-4 ">Sales Graph</h2>
          <div className="  h-48 bg-gray-200 flex items-center justify-center">
            <SalesGraph />
          </div>
        </div>
         <div className="sm:w-1/3 h-71 bg-white p-6 rounded shadow poppins-regular">
          <h2 className="text-xl font-semibold mb-2">Top-Selling Products</h2>
          <ul className="list-disc ml-5 space-y-1">
            {topProducts.length > 0 ? (
              topProducts.map((product) => (
                <li className="text-indigo-700" key={product.productId}>
                  {product.name}  [{product.totalSold} sold]
                </li>
              ))
            ) : (
              <li>No sales data available</li>
            )}
          </ul>
        </div>
      </div>

      {/* Top-Selling Products */}
    </div>
  );
};

export default AdminDashboard;
