import React, { useState,useEffect } from 'react';
import axios from 'axios';
import AddProduct from './addproduct'
import EditProduct from './editproduct';


const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Products = () => {
    const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);
  const handleAddProduct = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
    setAddingNew(false);
  };

  const handleSaveEdit = (updatedProduct) => {
    setProducts(prev =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
    setEditingProduct(null); 
  };

  const handleDeleteProduct = (_id) => {
    try{
      axios.delete(`${backendUrl}/products/delete/${_id}`)
      setProducts(prev => prev.filter(p => p._id !== _id));
      console.log('Deleted Successfully');
    }catch(error){
      console.error('error deleting product',error);
    }
  };

  return (
    <div className="p-6 custom-scrollbar">
        {!addingNew && !editingProduct && (
      <div className='flex justify-between items-baseline text-nowrap'>
        <h1 className="text-2xl font-bold mb-6 poppins-semibold ">Manage Products</h1>
        <button onClick={()=>setAddingNew(true)} className='bg-blue-500 text-white p-3 rounded-2xl '>Add  Product</button>
      </div>
        )}
      {addingNew && (
        <AddProduct onAdd={handleAddProduct} onCancel={() => setAddingNew(false)} />
      )}

      {editingProduct && (
        <EditProduct product={editingProduct} onSave={handleSaveEdit}  onCancel={() => setEditingProduct(null)} />
      )}

      {!addingNew && !editingProduct && (
        <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6"
          >
            <img
              src={product.cardImage}
              alt="Card"
              className="h-24 w-24 object-cover  rounded-2xl"
            />

            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="flex gap-2">
                <p className="font-semibold">Name:</p>
                <p>{product.name}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold">Baseprice:</p>
                <p>₹{product.price}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold">Discount:</p>
                <p>{product.discount}%</p>
              </div>

              {/* To-do make the price to discounted price */}

              <div className="flex gap-2">
                <p className="font-semibold">Price:</p>
                <p>₹{(product.price - product.price*(product.discount/100)).toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold">Brand:</p>
                <p>{product.brand}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold">Category:</p>
                <p>{product.category}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold">Rating:</p>
                <p>{product.rating}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold">Stock:</p>
                <p>{product.stock||0}</p>
              </div>
            </div>

            <div className=" mt-4 mb-4 flex  md:flex-row gap-2 items-center">
              <button
               onClick={() => setEditingProduct(product)}
               
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Products;
