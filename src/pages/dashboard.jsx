import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import '../stylesheets/dashboard.css';
import ProductList from "../components/productList";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import axios from "axios";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
function Dashboard() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isPaginated ,setIsPaginated] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPaginatedProducts = async (page = 1) => {
    try {
      const res = await axios.get(`${backendUrl}/products/paginated`, {
        params: {
          page: page,
          limit: 8,
        },
      });
      setFilteredProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
      setIsPaginated(true);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
      if (isPaginated) {
    fetchPaginatedProducts(currentPage);
  }
  }, [currentPage]);

  const handleSearch = async (query) => {
    try {
      const res = await axios.get(`${backendUrl}/products/search`, {
        params: { q: query },
      });
      setIsPaginated(false);
      setFilteredProducts(res.data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
const handleResetFilters = () => {
  setIsPaginated(true);            
  setCurrentPage(1);               
  fetchPaginatedProducts(1);       
};
// const handleFilteredProducts = () => {
//   setIsPaginated(false);            
//   setFilteredProducts()      
// };


  return (
    <div className="m-0 p-0">
      <div className="parent w-full h-screen merriweather-regular">
        <Navbar onSearch={handleSearch} />
        <div className="flex flex-1">
          <Sidebar onFilter={setFilteredProducts} onReset={handleResetFilters} />
          <div className="flex flex-col flex-1">
            <ProductList products={filteredProducts} />
            {isPaginated && (

              <div className="flex justify-center gap-4 mt-4 mb-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                Prev
              </button>
              <span className="text-lg">Page {currentPage} of {totalPages}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                Next
              </button>
            </div>
              )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;

