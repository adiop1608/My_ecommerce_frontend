import React from "react";

const orders = [
  {
    id: "ABC-6457325",
    date: "10 May 2021",
    status: "In progress",
    image: "https://i.imgur.com/4YQZ3Am.jpg", // replace with actual image URL
    summary:
      "Blue & pink Silk Saree | Linen Kurta | Printed black & white short kurti",
    price: "12,500",
    moreItems: 2,
  },
  {
    id: "ABC-6457325",
    date: "10 May 2021",
    status: "Delivered",
    image: "https://i.imgur.com/XbT94Vl.jpg",
    summary: "Two-seater wooden polished dining table",
    price: "8,999",
    moreItems: 0,
  },
  {
    id: "ABC-6457325",
    date: "10 May 2021",
    status: "Delivered",
    image: "https://i.imgur.com/XbT94Vl.jpg",
    summary: "Two-seater wooden polished dining table",
    price: "8,999",
    moreItems: 0,
  },
];

const Demo = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      <div className="flex space-x-3 mb-4">
        {["All", "In Progress", "Delivered", "Cancelled"].map((status) => (
          <button
            key={status}
            className="px-4 py-2 border rounded-full text-sm hover:bg-gray-100"
          >
            {status}
          </button>
        ))}
        <div className="ml-auto">
          <button className="border px-3 py-1 text-sm rounded-md">
            Select date range
          </button>
        </div>
      </div>

      {orders.map((order, index) => (
        <div
          key={index}
          className="border rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.status}
            </span>
            <span className="text-gray-500 text-sm">{order.date}</span>
          </div>

          <h4 className="text-sm font-medium text-red-600 mb-2">
            Order ID: {order.id}
          </h4>

          <div className="flex gap-4">
            <img
              src={order.image}
              alt="item"
              className="w-20 h-20 rounded object-cover"
            />
            <div className="text-sm">
              <p>
                {order.summary}
                {order.moreItems > 0 && (
                  <span className="text-red-600 font-semibold">
                    &nbsp;& {order.moreItems} more items
                  </span>
                )}
              </p>
              <p className="font-bold mt-2">₹ {order.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Demo;
