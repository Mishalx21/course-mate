"use client";
import React, { useState, useEffect } from "react";
import NavBar from "@/app/components/NavBar";
import ShoppingCard from "@/app/components/shoppingCard";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ShoppingCart() {
  const user_id = secureLocalStorage.getItem("u_id");
  const router = useRouter();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [cartCourses, setCartCourses] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (secureLocalStorage.getItem("u_id")) {
      setisLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!secureLocalStorage.getItem("u_id")) {
      router.push("/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchCartCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/get_cart_Info",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ student_id: user_id }),
          }
        );
        const json = await response.json();
        setCartCourses(json);
        // console.log("Cart Courses:", json);
      } catch (error) {
        console.error("Error fetching cart courses:", error);
      }
    };

    fetchCartCourses(); // Fetch data initially

    // Cleanup function to clear interval
  }, []);

  useEffect(() => {
    let totalPrice = 0;
    cartCourses.forEach((course) => {
      totalPrice += course[2]; // Assuming course[2] holds the price
    });
    setTotalPrice(totalPrice);
  }, [cartCourses]);

  async function removeFromCart(course_id, cart_id) {
    console.log("## Course ID:", course_id);
    console.log("## Cart ID:", cart_id);

    try {
      const response = await fetch(
        "http://localhost:3000/api/remove_course_from_cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart_id: cart_id, course_id: course_id }),
        }
      );
      const json = await response.json();

      // Remove course from cartCourses
      const newCartCourses = cartCourses.filter(
        (course) => course[0] !== course_id
      );
      setCartCourses(newCartCourses);
      localStorage.setItem("cartCourses", JSON.stringify(newCartCourses));

      // Update total price
      let totalPrice = 0;
      newCartCourses.forEach((course) => {
        totalPrice += course[2]; // Assuming course[2] holds the price
      });

      setTotalPrice(totalPrice);

      console.log("Course removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }
  const saveCartCoursesToSecureStorage = () => {
    secureLocalStorage.setItem("cartCourses", JSON.stringify(cartCourses));
    secureLocalStorage.setItem("cart_id", cart_id);
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="flex flex-row w-full h-screen mt-20">
        <div className="w-3/4 p-8 ml-20">
          <h1 className="mt-15 text-4xl">Shopping Cart</h1>
          {cartCourses.map((course) => (
            <ShoppingCard
              key={course[0]}
              courseName={course[1]}
              price={course[2]}
              rating={course[3]}
              removeFromCart={removeFromCart}
              cart_id={course[4]}
              course_id={course[0]}
            />
          ))}
        </div>
        <div className="w-1/4 p-8 mt-10">
          <div className="flex flex-col items-center border-2 border-gray-300 rounded-lg ">
            <div className="mt-6 mb-4">
              <h2 className="text-3xl font-semibold mb-4">Order Summary</h2>
              <h1 className="text-2xl font-semibold mb-2">Total:</h1>
            </div>
            <div className="mb-6">
              <h3 className="text-2xl">${totalPrice.toFixed(2)}</h3>
            </div>
            <div className="border-t border-gray-300 w-full p-4">
              <Link
                href="payment" 
              >
                <button onClick={saveCartCoursesToSecureStorage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl w-full">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
