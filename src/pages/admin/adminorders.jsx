import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.png"; // Adjust path if needed

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Orders = () => {
  const token = localStorage.getItem("authToken");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [sortField, setSortField] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/order/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setOrders(response.data);
          setFilteredOrders(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = [...orders];

    if (paymentFilter) {
      filtered = filtered.filter((o) => o.paymentStatus === paymentFilter);
    }

    if (orderStatusFilter) {
      filtered = filtered.filter((o) => o.orderStatus === orderStatusFilter);
    }

    if (sortField) {
      filtered.sort((a, b) => {
        if (sortField === "email") {
          return (a.userId?.email || "").localeCompare(b.userId?.email || "");
        } else if (sortField === "userId") {
          return (a.userId?._id || "").toString().localeCompare(b.userId?._id || "");
        } else {
          return a[sortField] - b[sortField];
        }
      });
    }

    setFilteredOrders(filtered);
  }, [sortField, paymentFilter, orderStatusFilter, orders]);

  const handleUpdateOrder = async (id, field, value) => {
    try {
      console.log(field, value);
      const response = await axios.put(
        `${backendUrl}/order/status/${id}`,
        { [field]: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const updatedOrder = response.data;
  
      // Update both orders and filteredOrders for UI update
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, [field]: value } : order
        )
      );
      setFilteredOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, [field]: value } : order
        )
      );
    } catch (error) {
      console.error("Failed to update", error);
    }
  };
  
  return (
    <div className="p-4 lato-regular">
      <div className="flex items-center gap-2 poppins-semibold top-4 right-4 justify-end mr-4">
        <img src={logo} alt="Shop Logo" className="size-13 rounded-2xl" />
        <h3 className="text-lg font-medium">Shopshere</h3>
      </div>

      <h1 className="text-3xl mt-4 ml-4 mb-8 text-gray-800 font-bold poppins-semibold">
        Manage Orders
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 ml-4">
        <div className="flex items-baseline justify-center gap-4">
          <p className="text-indigo-700 poppins-semibold text-lg">Sort :</p>
          <select
            className="border text-gray-800 border-gray-300 rounded-xl px-3 py-2"
            onChange={(e) => setSortField(e.target.value)}
            value={sortField}
          >
            <option value="">All</option>
            <option value="userId">User ID</option>
            <option value="email">User Email</option>
            <option value="subTotal">Total Amount</option>
            <option value="totalDiscount">Total Discount</option>
          </select>
        </div>

        <div className="flex items-baseline justify-center gap-4">
          <p className="text-indigo-700 poppins-semibold text-lg">Filter :</p>
          <select
            className="border text-gray-800 border-gray-300 rounded-xl px-3 py-2"
            onChange={(e) => setPaymentFilter(e.target.value)}
            value={paymentFilter}
          >
            <option value="">Payment</option>
            <option>Paid</option>
            <option>Pending</option>

          </select>

          <select
            className="border text-gray-800 border-gray-300 rounded-xl px-3 py-2"
            onChange={(e) => setOrderStatusFilter(e.target.value)}
            value={orderStatusFilter}
          >
            <option value="">Order</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-nowrap text-gray-800">
            <tr className="border-b border-gray-200">
              <th className="px-3 py-2">User ID</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Total Amount</th>
              <th className="px-3 py-2">Total Discount</th>
              <th className="px-3 py-2">Payment Status</th>
              <th className="px-3 py-2">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order._id}
                className="text-center border-1 border-gray-200 hover:bg-gray-50 text-gray-700"
              >
                <td className="p-2">{order.userId._id || "N/A"}</td>
                <td className="p-2">{order.userId.email || "N/A"}</td>
                <td className="p-2">₹{order.subtotal}</td>
                <td className="p-2">₹{order.totalDiscount.toFixed(2)}</td>
                <td className="p-2">
                  <select
                    value={order.paymentStatus}
                    onChange={(e) =>
                      handleUpdateOrder(order._id, "paymentStatus", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-3 py-1 text-gray-700"
                  >
                    <option>Paid</option>
                    <option>Pending</option>
                  </select>
                </td>
                <td className="p-2">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleUpdateOrder(order._id, "orderStatus", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-3 py-1 text-gray-700"
                  >
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
