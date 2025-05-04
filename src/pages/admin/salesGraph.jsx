import React, { useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// // Dynamically import recharts components
// const LineChart = lazy(() => import("recharts").then(module => ({ default: module.LineChart })));
// const Line = lazy(() => import("recharts").then(module => ({ default: module.Line })));
// const XAxis = lazy(() => import("recharts").then(module => ({ default: module.XAxis })));
// const YAxis = lazy(() => import("recharts").then(module => ({ default: module.YAxis })));
// const Tooltip = lazy(() => import("recharts").then(module => ({ default: module.Tooltip })));
// const CartesianGrid = lazy(() => import("recharts").then(module => ({ default: module.CartesianGrid })));
// const ResponsiveContainer = lazy(() => import("recharts").then(module => ({ default: module.ResponsiveContainer })));
const backendUrl = import.meta.env.VITE_BACKEND_URL;
function SalesGraph() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/order/sales`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }); 

        const data = response.data.map(item => ({
          date: item._id, 
          amount: item.totalSales, 
        }));

        setSalesData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sales data:", error);
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) {
    return <div>Loading chart...</div>; // Or any other loading indication
  }

  return (
    <div className="w-2/3 max-w-4xl mx-auto p-4">
      <Suspense fallback={<div>Loading Chart...</div>}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#000" }} />
            <YAxis
              tick={{ fontSize: 12, fill: "#000" }}
              label={{ value: "Sales", angle: -90, position: "insideLeft", fontSize: 14, fill: "#000" }}
            />
            <Tooltip contentStyle={{ fontSize: 14, backgroundColor: "#1f2937", color: "#fff" }} />
            <Line type="linear" dataKey="amount" stroke="#ff6b6b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Suspense>
    </div>
  );
}

export default SalesGraph;
