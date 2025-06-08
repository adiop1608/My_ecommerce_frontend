'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export default function Cart() {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchCart = async () => {
    const token = localStorage.getItem('authToken');

    try {
      const res = await axios.get(`${backendUrl}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }

      })
      console.log('Fetched Cart',res.data)
      setCart(res.data)
      setLoading(false)

    } catch (err) {
      console.error('Failed to fetch cart', err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const handleQuantityChange = async (productId, quantity) => {
    const token = localStorage.getItem('authToken');

    try {
      const res = await axios.put(
        `${backendUrl}/cart/update-quantity`,
        { productId, quantity },{
          headers: {
            Authorization: `Bearer ${token}`
          } 
        }
      )
      setCart(res.data)
    } catch (err) {
      console.error('Quantity update failed', err)
    }
  }

  const handleRemoveProduct = async (productId) => {
    const token = localStorage.getItem('authToken');

    try {
      const res = await axios.put(
        `${backendUrl}/cart/remove-product`,
        { productId },{
          headers: {
            Authorization: `Bearer ${token}`
          } 
        }
      )
      setCart(res.data)
    } catch (err) {
      console.error('Failed to remove product', err)
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  if (!cart || cart.products.length === 0)
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Link to="/dashboard" className="text-indigo-600 hover:underline">
          Continue shopping
        </Link>
      </div>
    )

  return (
    <div className='merriweather-regular'>
      <div className="flex justify-end px-8 mt-4">
        <img src="../src/assets/logo.png" alt="" className="size-10 rounded-2xl" />
        <span className="ml-2 flex items-center font-serif text-xl">Shopsphere</span>
      </div>

      <div className="mx-auto max-w-7xl px-8 py-4">
        <p className="text-2xl font-bold mb-6 mt-12 inline-block">Cart</p>

        <div className="bg-white shadow-xl  px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cart.products.map((product) => (
                <li key={product.productId} className="flex py-6">
                  <div className="size-24 shrink-0 overflow-hidden rounded-md ">
                    <img alt={product.name} src={product.cardImage} className="size-full object-cover" />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{product.name}</h3>
                      <p className="ml-4 line-through text-gray-500">${product.price}</p>
                    </div>
                    <div className="flex justify-end font-medium text-gray-600">
                      
                      <p className="ml-4">${(product.price -(( product.price * product.discount)/100)).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Qty</p>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <select
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(product.productId, parseInt(e.target.value))}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        {[1, 2, 3, 4, 5].map((qty) => (
                          <option key={qty} value={qty}>
                            {qty}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => handleRemoveProduct(product.productId)}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${cart.subtotal.toFixed(2)}</p>
            
          </div>
          <div className="flex justify-between text-sm text-gray-700">
          <p>Total Discount</p>
          <p>${cart.totalDiscount.toFixed(2)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>

          <div className="mt-6 flex items-center justify-center">
            <Link
              to="/checkout"
              className="md:w-1/2 w-full flex justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              or{' '}
              <Link to="/dashboard">
                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
