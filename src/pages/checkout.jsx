"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Checkout() {
  const [AddressIndex, setAddressIndex] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("authToken");
  const location = useLocation();
  const buyNowProduct = location.state?.buyNowProduct;

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`${backendUrl}/auth/address`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAddresses(res.data.addresses);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };

    fetchAddresses();
  }, []);

  useEffect(() => {
    if (buyNowProduct) {
      const discounted = (
        buyNowProduct.price -
        (buyNowProduct.price * buyNowProduct.discount) / 100
      ).toFixed(2);
      const discountValue = buyNowProduct.price - discounted;

      setCart({
        products: [
          {
            productId: buyNowProduct.productId,
            name: buyNowProduct.name,
            price: buyNowProduct.price,
            discount: buyNowProduct.discount,
            quantity: 1,
            cardImage: buyNowProduct.cardImage,
          },
        ],
        subtotal: parseFloat(discounted),
        totalDiscount: parseFloat(discountValue),
      });
      setLoading(false);
    } else {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${backendUrl}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch cart", err);
      setLoading(false);
    }
  };

  const handleQuantityChange = buyNowProduct
    ? () => {}
    : async (productId, quantity) => {
        try {
          const res = await axios.put(
            `${backendUrl}/cart/update-quantity`,
            { productId, quantity },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCart(res.data);
        } catch (err) {
          console.error("Quantity update failed", err);
        }
      };

  const handleRemoveProduct = buyNowProduct
    ? () => {}
    : async (productId) => {
        try {
          const res = await axios.put(
            `${backendUrl}/cart/remove-product`,
            { productId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCart(res.data);
        } catch (err) {
          console.error("Failed to remove product", err);
        }
      };

  const handlePlaceOrder = async () => {
    if (AddressIndex === null) {
      alert("Please select an address");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    const selectedAddress = addresses[AddressIndex];

    const orderData = {
      products: cart.products,
      address: selectedAddress,
      paymentMethod,
      subtotal: cart.subtotal,
      totalDiscount: cart.totalDiscount,
    };

    try {
      const response = await fetch(`${backendUrl}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Order placed successfully!");
      } else {
        const text = await response.text();
        console.error("Order error:", text);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newAddress = {
      firstName: form["firstName"].value,
      lastName: form["lastName"].value,
      street: form["street"].value,
      city: form["city"].value,
      pinCode: form["pinCode"].value,
      state: form["state"].value,
      country: form["country"].value,
      phoneNumber: form["phoneNumber"].value,
    };

    try {
      const res = await axios.post(
        `${backendUrl}/auth/addaddress`,
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddresses(res.data.addresses);
    } catch (err) {
      console.error("Error adding address:", err.response?.data || err.message);
    }
  };

  if (loading || !cart) return <div className="p-8">Loading...</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 merriweather-regular scroll-smooth">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3 bg-white shadow-2xl">
          <div className=" px-5 py-5">
            <div className="space-y-12">
              <form
                onSubmit={handleAddressSubmit}
                className="border-b border-gray-900/10 pb-12"
              >
                <h2 className=" text-2xl font-bold text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Use a permanent address where you can receive order.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="firstName"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        autocomplete="given-name"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      ></input>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="lastName"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      ></input>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Contact Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="number"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      ></input>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                      <select
                        id="country"
                        name="country"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option>India</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                      <svg
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="street"
                        id="street"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      ></input>
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      ></input>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      State
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="state"
                        id="state"
                        autocomplete="address-level1"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      ></input>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pinCode"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Pincode
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="pinCode"
                        id="pinCode"
                        autocomplete="postal-code"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      ></input>
                    </div>
                    <div className="mt-12 text-nowrap flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        className="text-sm/6 font-semibold border border-gray-100 bg-gray-200 px-2 py-[6px] rounded-lg shadow-2xl text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className=" inline rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Address
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <form className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Address
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Choose From Existing Address
                </p>
                <ul role="list" className="divide-y divide-gray-100">
                  {addresses.map((address, index) => (
                    <li
                      key={index}
                      className="flex justify-between gap-x-6 py-5"
                    >
                      <div className="flex flex-row min-w-0 gap-x-4">
                        <input
                          type="radio"
                          name="selectedAddress"
                          value={index}
                          checked={AddressIndex === index}
                          onChange={() => setAddressIndex(index)}
                          className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                        />
                        <div className="min-w-0 flex-auto">
                          <div className="flex gap-x-2">
                            <p className="text-sm/6 font-semibold text-gray-900">
                              {address.firstName}
                            </p>
                            <p className="text-sm/6 font-semibold text-gray-900 inline">
                              {address.lastName}
                            </p>
                          </div>
                          <p className="mt-1 truncate text-xs/5 text-gray-500">
                            {address.street}
                          </p>
                          <p className="mt-1 truncate text-xs/5 text-gray-500">
                            {address.city} , {address.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="mt-1 truncate text-xs/5 text-gray-900">
                          {address.phoneNumber}
                        </p>

                        <p className="mt-1 truncate leading-6 text-xs/5 text-gray-500">
                          {address.state}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          {address.country}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm/6 font-semibold text-gray-900">
                      Payment methods
                    </legend>
                    <p className="mt-1 text-sm/6 text-gray-600">Choose One</p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          name="payments"
                          type="radio"
                          value="cash"
                          checked={paymentMethod === "cash"}
                          onChange={() => setPaymentMethod("cash")}
                          className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                        />
                        <label
                          htmlFor="cash"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Cash
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          name="payments"
                          type="radio"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Card Payment
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="merriweather-regular">
            <div className="mx-auto max-w-7xl px-8 py-4 md:mt-8">
              <div className="bg-white shadow-2xl  px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cart.products.map((product) => (
                      <li key={product.productId} className="flex py-6">
                        <div className="size-24 shrink-0 overflow-hidden rounded-md ">
                          <img
                            alt={product.name}
                            src={product.cardImage}
                            className="size-full object-cover"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{product.name}</h3>
                            <p className="ml-4">
                              $
                              {(
                                product.price -
                                (product.price * product.discount) / 100
                              ).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex justify-end font-medium text-gray-600">
                            <p className="ml-4 line-through text-gray-500">
                              ${product.price}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Qty</p>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <select
                              value={product.quantity}
                              disabled={!!buyNowProduct}
                              onChange={(e) =>
                                handleQuantityChange(
                                  product.productId,
                                  parseInt(e.target.value)
                                )
                              }
                              className="border border-gray-300 rounded px-2 py-1"
                            >
                              {[1, 2, 3, 4, 5].map((qty) => (
                                <option key={qty} value={qty}>
                                  {qty}
                                </option>
                              ))}
                            </select>

                            {!buyNowProduct && (
                              <button
                                onClick={() =>
                                  handleRemoveProduct(product.productId)
                                }
                                className="font-medium text-red-600 hover:text-red-500"
                              >
                                Remove
                              </button>
                            )}
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
                  <p>
                    $
                    {cart.totalDiscount
                      ? cart.totalDiscount.toFixed(2)
                      : "0.00"}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-center">
                  <button
                    className="md:w-1/2 w-full flex justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
                    onClick={handlePlaceOrder}
                  >
                    Pay and Order
                  </button>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/dashboard">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
