import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import '../stylesheets/dashboard.css';
import ProductList from "../components/productList";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import axios from "axios";

function Dashboard() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSearch = async (query) => {
    try {
      const res = await axios.get(`${backendUrl}/products/search`, {
        params: { q: query },
      });
      setFilteredProducts(res.data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };


  return (
    <div className="m-0 p-0">
      <div className="parent w-full h-screen merriweather-regular">
        <Navbar onSearch={handleSearch} />
        <div className="flex flex-1">
          <Sidebar onFilter={setFilteredProducts} />
          <div className="flex flex-1">
            <ProductList products={filteredProducts} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
