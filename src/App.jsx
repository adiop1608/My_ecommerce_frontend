import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login'
import SignUp from './pages/signup'
import Dashboard from './pages/dashboard'
import ProductCard from './components/productCard'
import { BrowserRouter,Routes,Route ,Navigate } from "react-router-dom"
import axios from 'axios'
import ProductList from './components/productList'
import AddProduct from './pages/admin/addproduct'
import ProductPage from './pages/productpage'
import Cart from './components/cart'
import Checkout from './pages/checkout'
import Admin from './pages/admin/admin'
import AdminDashboard from './pages/admin/adminDashboard'






function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='*' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admindash' element={<AdminDashboard/>}/>




      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App








  // useEffect(()=>{
  //   const token = localStorage.getItem("token");
  //   if(token){
  //     fetch(`${backendUrl}/auth/validate`,{
  //       method:"POST",
  //       headers:{
  //         "Content-Type":"application/json",
  //         "Authorization":`Bearer ${token}`
  //       }
  //     })
  //     .then(res=>res.json())
  //     .then(data=>{
  //       if(data.message ==="Token is Valid"){
  //         console.log("User is authenticated",data.user);
  //         setIsAuthenticated(true);
  //       }else{
  //         localStorage.removeItem("token");
  //         setIsAuthenticated(false);
  //         console.log("Invalid Token, redirecting to Login..");
  //       }
  //     })
  //     .catch(()=>{
  //       localStorage.removeItem("token");
  //       setIsAuthenticated(false);
  //       console.log("Authenticated failed, Logging out");
  //     });

  //   }
  // },[])
  