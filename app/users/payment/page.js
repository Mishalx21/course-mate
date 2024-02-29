"use client";
import { Container } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";

const CheckoutPage = () => {
  const router = useRouter();
  const courses = secureLocalStorage.getItem("cartCourses");
  const data = JSON.parse(courses);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [account, setAccount] = useState("");
  let price = 0;

  data.forEach((course) => {
    price += course[2]; // Assuming course[2] holds the price
  });

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  };

  const handleBuyCourse = () => {
    data.forEach((course) => {
      const course_id = course[0];
      const student_id = secureLocalStorage.getItem("u_id");
      const buyCourse = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/buy_course", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              studentId: student_id,
              courseId: course_id,
              method: paymentMethod,
              account: account,
              price: course[2],
            }),
          });
          const json = await response.json();
          console.log(json);
          alert(json.message);
          
        } catch (error) {
          console.error("Error buying course:", error);
          alert("Error buying course");
          // Handle error appropriately
        }
      };
      buyCourse();
    });
    router.push(`/`);
  };

  return (
    <Container>
      <div className="flex justify-between p-4">
        <div className="w-2/3 p-4 border border-gray-300 mr-2">
          <h2 className="text-3xl font-bold mb-4">Checkout</h2>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Payment Method</h3>
            <label className="block mb-2">
              <input
                type="radio"
                name="payment"
                value="Nagad"
                className="mr-2"
                onChange={handlePaymentMethodChange}
              />
              Nagad
            </label>
            <label className="block">
              <input
                type="radio"
                name="payment"
                value="PayPal"
                className="mr-2"
                onChange={handlePaymentMethodChange}
              />
              PayPal
            </label>
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="account_number"
              placeholder="Name on Card"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="text"
              name="amount"
              placeholder="Card Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={handleAccountChange}
            />
          </div>
        </div>
        <div className="w-1/3 p-4 border border-gray-300">
          <h2 className="text-3xl font-bold mb-4">Summary</h2>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="w-2/3">Price</span>
              <span className="w-1/3 text-right">${price}</span>
            </div>
            <div className="text-right font-bold">Total Price: ${price}</div>
          </div>
          <button
            onClick={handleBuyCourse}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          >
            Complete Checkout
          </button>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
