import { useState } from "react";
import Adminbar from "../../components/adminSidebar";
import AdminDashboard from "./adminDashboard";
import Users from "./userManagement";
import Products from "./Adminproducts";
import Orders from "./adminorders";

function Admin() {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  const renderContent = () => {
    switch (selectedPage) {
      case "dashboard":
        return <AdminDashboard />;
      case "users":
        return <Users />;
      case "products":
        return <Products />;
      case "orders":
        return <Orders />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="m-0 p-0">
      <div className="w-full h-screen">
        <div className="flex">
          <div className="lg:w-1/7 w-1/3 h-screen">
            <Adminbar setSelectedPage={setSelectedPage} />
          </div>
          <div className="lg:w-6/7 w-2/3 h-screen overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
