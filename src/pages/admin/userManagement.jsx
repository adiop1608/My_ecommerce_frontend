import { useEffect, useState } from "react";
import Navbar from '../../components/navbar';
import axios from "axios";
import shopsphereLogo from '../../assets/logo.png'

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UserManagement = () => {
  const token = localStorage.getItem("authToken");
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortField, setSortField] = useState("firstName");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/auth/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setUsers([]);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
        // Fallback to demo users for development
        setUsers(demoUsers);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let updatedUsers = [...users];

    if (roleFilter !== "All") {
      updatedUsers = updatedUsers.filter(user => user.role === roleFilter);
    }

    updatedUsers.sort((a, b) => {
      const valA = a[sortField]?.toLowerCase?.() || "";
      const valB = b[sortField]?.toLowerCase?.() || "";
      return valA.localeCompare(valB);
    });

    setFilteredUsers(updatedUsers);
  }, [roleFilter, sortField, users]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axios.put(`${backendUrl}/auth/role/${userId}`, 
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const updated = users.map(user =>
        user._id === userId ? { ...user, role: newRole } : user
      );
      setUsers(updated);
    } catch (err) {
      console.error("Failed to update role:", err);
      alert("Error updating role. Please try again.");
    }
  };
  

  return (
    <div className="p-4 lato-regular ">
      <div className="flex items-center gap-2 poppins-semibold top-4 right-4 justify-end mr-4">
        <img src={shopsphereLogo} alt="logo" className="size-13 rounded-2xl" />
        <h3 className="text-lg font-medium">Shopshere</h3>
      </div>

      <h2 className="text-3xl mt-4 ml-4 mb-8 poppins-semibold">User Management</h2>

      {/* Filters */}
      <div className="flex flex-wrap ml-4 gap-4 mb-6">
        <div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border-1 border-gray-400 rounded-lg px-3 py-1 text-gray-700"
          >
            <option value="All">All</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="mr-4 font-semibold text-indigo-600">Filter:</label>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="border-1 border-gray-400 rounded-lg px-3 py-1 text-gray-700 lato-semibold"
          >
            <option value="">All</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="email">Email</option>
            <option value="phoneNumber">Phone Number</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-nowrap text-gray-800">
            <tr className="border-b border-gray-200">
              <th className="px-3 py-2">First Name</th>
              <th className="px-3 py-2">Last Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id} className=" text-center  border-1 border-gray-200 hover:bg-gray-50 text-gray-700">
                <td className="p-2">  {user.addresses?.[0]?.firstName || "N/A"} </td>
                <td className="p-2">  {user.addresses?.[0]?.lastName || ""} </td>
                <td className="p-2">{user.email}</td>
                <td className="px-4 py-2">  {user.addresses?.[0]?.phoneNumber || "N/A"}</td>
                <td className="px-4 py-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border-1 border-gray-400 rounded-lg px-3 py-1 text-black"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
