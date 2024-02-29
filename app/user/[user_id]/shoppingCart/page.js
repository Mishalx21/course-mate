"use client";
import NavBar from "@/app/components/NavBar";
import ShoppingCard from "@/app/components/shoppingCard";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export default function ShoppindCart() {
  const [cartCourses, setCartCourses] = useState([]);

  const user = secureLocalStorage.getItem("u_id");
  useEffect(() => {
    async function init() {
      console.log("user");
      const response = await fetch("http://localhost:3000/api/get_cart_Info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ student_id: user }),
      });

      const json = await response.json();
      setCartCourses(json);
      console.log(json);
    }

    init();
  }, []);

  return (
    <>
      <div>
        <NavBar />
      </div>

      <div className="flex flex-row w-full h-screen mt-20">
        <div className="w-3/4 p-8 ml-20">
          <h1 className="mt-15 text-4xl">Shopping Cart</h1>

          {/* <ShoppingCard /> */}
        </div>

        <div className="w-1/4 p-8 mt-10">
          <div className="flex flex-col items-center border-2 border-gray-300 rounded-lg ">
            <div className="mt-6 mb-4">
              <h2 className="text-3xl font-semibold mb-4">Order Summary</h2>
              <h1 className="text-2xl font-semibold mb-2">Total:</h1>
            </div>
            <div className="mb-6">
              <h3 className="text-2xl">$99.99</h3>
            </div>
            <div className="border-t border-gray-300 w-full p-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
