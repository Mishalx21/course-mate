import { Container } from "@mui/material";
import React from "react";

const CheckoutPage = () => {
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
              />
              Nagad
            </label>
            <label className="block">
              <input
                type="radio"
                name="payment"
                value="PayPal"
                className="mr-2"
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
            />
          </div>
        </div>
        <div className="w-1/3 p-4 border border-gray-300">
          <h2 className="text-3xl font-bold mb-4">Summary</h2>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="w-2/3">Price</span>
              <span className="w-1/3 text-right">$100</span>
            </div>
            <div className="text-right font-bold">Total Price: $100</div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
            Complete Checkout
          </button>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
