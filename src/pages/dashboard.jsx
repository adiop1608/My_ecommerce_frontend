import React,{useState} from "react";
import Navbar from "../components/navbar";
import '../stylesheets/dashboard.css'
import ProductList from "../components/productList";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
function Dashboard() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  return (
    <div className="m-0 p-0">
      <div className="parent w-full h-screen merriweather-regular   ">
        <Navbar></Navbar>
        <div className="flex flex-1">
          <Sidebar onFilter={setFilteredProducts} ></Sidebar>
          <div className="flex flex-1">
          <ProductList products={filteredProducts}></ProductList>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Dashboard;
